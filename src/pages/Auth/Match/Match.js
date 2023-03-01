import React, {useEffect, useState, useRef, useLayoutEffect} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {useNavigate} from "react-router-dom";
import {api_get_me, api_get_user, api_get_messages, api_cancel_match, api_get_message_history, api_read_messages} from "../../../services/data_provider";
import MatchError from "./MatchError";
import NoCurrentMatch from "./NoCurrentMatch";
import {get_more_svg_icon} from '../../../assets/Svg/Svg';
import {io} from "socket.io-client";


const Match = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [errored, setErrored] = useState(false);
    const [me, setMe] = useState(undefined);
    const [myMatch, setMyMatch] = useState(undefined);
    const get_more_icon = get_more_svg_icon();
    const [chatMessages, setChatMessages] = useState([]);
    const messageRef = useRef('');
    const messagesEndRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [noCurrentMatches, setNoCurrentMatches] = useState(false);
    const [currentOldestMessageDate, setCurrentOldestMessageDate] = useState('');

    const [thereAreMoreMessages, setThereAreMoreMessages] = useState(false);

    const readMessages = async () => {
        try{
            const result = await api_read_messages();
            console.log("result:", result);
        }
        catch(exception){
            console.log("exception:", exception);
        }
    }

    const getMessageHistory = async () => {
        try{
            const result = await api_get_message_history(currentOldestMessageDate);
            if(result?.status === 200 && result?.data?.messages){
                if(result?.data?.messages?.length === 0 || result?.data?.messages?.more_messages === 0){
                    setThereAreMoreMessages(false);
                }
                else{
                    const all = chatMessages;
                    const oldest_message = result.data.messages[result.data.messages.length-1];
                    setCurrentOldestMessageDate(oldest_message.createdAt);
                    result.data.messages.forEach(el => {
                        const message_object = {from: el.from, data: el.message};
                        all.unshift(message_object);
                    });
                    setChatMessages(all);
                }
            }
        }
        catch(exception){
            console.log("exception:", exception);
        }
    }

    const confirmUnmatch = async () => {
        try{
            await api_cancel_match();
            socket.emit('unmatch', '');
        }
        catch(exception){
            console.log('exception:',exception);
            setErrored(true);
        }

    };

    const cancel = () => {
        setShowModal(false);
    };

    const scrollToBottom = () => {
        setTimeout(function(){
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100);

    };

    const showMatchImage = () => {
        navigate(t('URL_VIEW_MATCH'));
    };

    const sendMessage = (e) => {
        if(e.key === 'Enter'){
            if(messageRef?.current?.value){
                const msg = messageRef.current.value;
                const message_object = {from: me._id, data: msg};
                setChatMessages([...chatMessages, message_object]);
                console.log("chatMessages",chatMessages);
                socket.emit('message', msg);
                messageRef.current.value = '';
                scrollToBottom();
            }
        }
    }

    useEffect(() => {
        const ensureOngoingMatch = async () => {
            try{
                const response = await api_get_me();
                if(response.status !== 200 || !response?.data?.user?.current_match){
                    console.log("response.status !== 200 || !response?.data?.user?.current_match");
                    return setNoCurrentMatches(true);
                }
                const my_current_match = response.data.user.current_match;
                const my_id = response.data.user._id;
                const match_response = await api_get_user(my_current_match);
                if(match_response.status !== 200 || !match_response?.data?.user?.current_match){
                    console.log("match_response.status !== 200 || !match_response?.data?.user?.current_match");
                    return setNoCurrentMatches(true);
                }
                if(my_id !== match_response.data.user.current_match){
                    console.log("my_id !== match_response.data.user.current_match");
                    return setNoCurrentMatches(true);
                }
                setMe(response.data.user);
                setMyMatch(match_response.data.user);

                const all_messages = await api_get_messages();
                console.log('all_messages:',all_messages);
                if(all_messages?.data?.messages?.length){
                    const all = [];
                    const oldest_message = all_messages.data.messages[0];
                    console.log('oldest_message:',oldest_message);
                    setCurrentOldestMessageDate(oldest_message.createdAt);
                    all_messages.data.messages.forEach(el => {
                        const message_object = {from: el.from, data: el.message};
                        all.push(message_object);
                    });
                    setChatMessages(all);
                    scrollToBottom();
                    if(all_messages?.data?.more_messages){
                        setThereAreMoreMessages(true);
                    }
                }
                await readMessages();

                const access_token = localStorage.getItem("token");
                const extra_headers = {
                    access_token: access_token,
                    room: response.data.user.room,
                    user_id: response.data.user._id,
                    tkn: access_token,
                    name: response.data.user.name
                };
                console.log('extra_headers',extra_headers);
                const sck = io(process.env.REACT_APP_CHAT_BASE, {
                    path: "/socket.io",
                    autoConnect: true,
                    extraHeaders: extra_headers,
                    transports: ['polling']
                });
                console.log('sck:',sck);

                sck.on('private', function(msg) {
                    const message_object = {from: 'user', data: msg};
                    setChatMessages(curr => [...curr, message_object]);
                    scrollToBottom();
                });

                sck.on('unmatched', function(msg) {
                    sck.disconnect();
                    console.log('you got unmatched. redirecting');
                    navigate(t('URL_UNMATCHED'));
                });
                setSocket(sck);
            }
            catch(exception){
                console.log('exception:',exception);
                setErrored(true);
            }
        };

        ensureOngoingMatch().catch(console.error);
    }, [navigate, t]);

    useLayoutEffect(() => {
        return () => {
            console.log("are we leaving?");
        }
    }, [])

    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                {noCurrentMatches && <NoCurrentMatch />}
                {errored && <MatchError error_message={t('SOMETHING_WENT_WRONG')}/>}
                {
                    me && myMatch &&
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <div className="col col-4 text-left">
                                <h6 className="title pointer">
                                    {myMatch.pictures.length > 0 && <img src={`${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/tiny-picture-${myMatch.pictures[0]}`} alt="" onClick={showMatchImage}/>}
                                    {myMatch.pictures.length === 0 && <span onClick={showMatchImage}><i className="fas fa-user"></i></span>}
                                </h6>
                            </div>
                            <div className="col col-4 text-center">
                                <h6 className="title">
                                    {t('YOU_AND')} {myMatch.name}
                                </h6>
                            </div>
                            <div className="col col-4">
                                <div className="more" style={{width: '100%'}}>
                                    {get_more_icon}
                                    <ul className="more-dropdown">
                                        <li className="danger_link" onClick={e => setShowModal(true)}>
                                            Avmatcha
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="ui-block-content" style={{height: '80vh', position: 'relative'}}>
                            <div style={{position: 'absolute', bottom: '20px', width: '95%'}}>
                                <input onClick={readMessages} onKeyPress={e => sendMessage(e)} type="text" ref={messageRef} style={{border: '1px solid gray', width: '100%'}} placeholder="Enter message"/>
                            </div>
                            <div style={{height: '85%', border: '1px solid gray', padding: '5px', overflowY: 'scroll', borderRadius: '5px'}} onClick={readMessages} >
                                {
                                    thereAreMoreMessages &&
                                    <div className="a_div text-center pointer" style={{paddingBottom: '15px'}} onClick={getMessageHistory}>
                                        Get more messages
                                    </div>
                                }

                                {
                                    chatMessages.length > 0 && chatMessages.map((ob, index) =>
                                        <div key={index} style={{padding: '5px'}} className="row">
                                            <div className="col col-6">
                                                {
                                                    ob.from !== me._id &&
                                                    <div>
                                                        <div className="chat_message_other">
                                                            {ob.data}
                                                        </div>
                                                    </div>
                                                }
                                                {ob.from === me._id && <span>&nbsp;</span>}
                                            </div>
                                            <div className="col col-6">
                                                {
                                                    ob.from === me._id &&
                                                    <div>
                                                        <div className="chat_message_me">
                                                            {ob.data}
                                                        </div>
                                                    </div>
                                                }
                                                {ob.from !== me._id && <span>&nbsp;</span>}
                                            </div>
                                        </div>
                                    )
                                }
                                <div ref={messagesEndRef}>&nbsp;</div>
                            </div>
                        </div>
                    </div>
                }
                <div className={`modal ${showModal ? 'forced_show' : ''}`} role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">
                    <div className="modal-dialog window-popup update-header-photo" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center" style={{width: '100%'}}>
                                <div style={{textAlign: 'center',width: '100%'}}>
                                    <h6 className="title">
                                        {t('DO_YOU_REALLY_WANT_TO_UNMATCH')}
                                    </h6>
                                    <div>
                                        {t('UNMATCH_CONSEQUENCES')}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body">
                                <div className="row" style={{width: '100%', padding: '40px'}}>
                                    <div className="col col-6 text-center">
                                        <button onClick={confirmUnmatch} className="btn btn-danger btn-lg">{t('YES_IM_SURE')}</button>
                                    </div>
                                    <div className="col col-6 text-center">
                                        <button onClick={cancel} className="btn btn-danger btn-lg">{t('WAIT_I_REGRET')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Match;