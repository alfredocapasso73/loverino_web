import React, {useEffect, useState, useContext} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {api_get_competition, api_get_user, api_post_competition} from "../../../services/data_provider";
import {useNavigate} from "react-router-dom";
import CompetitionUserProfile from "./CompetitionUserProfile";
import CompetitionError from "./CompetitionError";
import UserProfile from "./UserProfile";
import {get_age_from_birthday} from "../../../helpers/DataCommon";
import {API_URLS} from "../../../services/api";
import AppContext from "../../../components/AppContext";

const Competition = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const globalContext = useContext(AppContext);
    const [finalWinner, setFinalWinner] = useState(undefined);
    const [competitionUsers, setCompetitionUsers] = useState([]);
    const [col, setCol] = useState('');
    const [competitionId, setCompetitionId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [competitionError, setCompetitionError] = useState(false);
    const [showingImagePopup, setShowingImagePopup] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState(undefined);
    const [clickedUser, setClickedUser] = useState();
    const [matched, setMatched] = useState(false);

    const [imagePosition, setImagePosition] = useState(0);

    const browseImages = (direction) => {
        if(direction === 'b'){
            const new_position = imagePosition === 0 ? (clickedUser.pictures.length-1) : imagePosition-1;
            console.log("new_position",new_position);
            setImagePosition(new_position);
        }
        else{
            const new_position = imagePosition < (clickedUser.pictures.length-1) ? imagePosition+1 : 0;
            console.log("new_position",new_position);
            setImagePosition(new_position);
        }

    }

    const getAge = (birthday) => {
        return get_age_from_birthday(birthday);
    }

    const imageClose = () => {
        setShowingImagePopup(false);
    }

    const onImageClick = (user) => {
        setClickedUser(user);
        setShowingImagePopup(true);
        setImagePosition(0);
    }

    const winnerChosen = async () => {
        try{
            const body = {
                competition_id: competitionId
                ,winner_id: selectedWinner._id
            };
            const response = await api_post_competition(body);
            setShowModal(false);
            if(response.status !== 200){
                setCompetitionError(true);
                return;
            }
            const match_found = response?.data?.you_got_a_match;
            if(match_found){
                const match = await api_get_user(match_found);
                const loggedInUserDetails = globalContext.loggedInUserDetails;
                loggedInUserDetails.current_match = match_found;
                globalContext.loggedInUserDetails = loggedInUserDetails;
                setMatched(true);
            }
            setCompetitionUsers([]);
            setFinalWinner(selectedWinner);
            console.log("selectedWinner",selectedWinner);
            console.log("response",response);
        }
        catch(exception){
            setCompetitionError(true);
            console.log('exception:',exception);
        }
    }

    const cancel = () => {
        setSelectedWinner(undefined);
        setShowModal(false);
    }

    const winnerSelected = (id) => {
        const found = competitionUsers.find(el => el._id === id);
        if(found){
            setSelectedWinner(found);
            setShowModal(true);
        }
    }

    useEffect(() => {

        const getCurrentCompetition = async () => {
            try{
                const competition = await api_get_competition();
                if(competition.status !== 200 || !competition?.data?.competition_id || !competition?.data?.users?.length){
                    console.log('no competition:');
                    console.log("go to suggestion page");
                    return navigate(t('URL_YOUR_SUGGESTIONS'));
                }
                setCompetitionId(competition.data.competition_id);
                const users = competition.data.users;
                console.log('users:',users);
                const arr = [];
                for await (const user of users){
                    const found = await api_get_user(user.user_id);
                    arr.push(found.data.user);
                    console.log('found:',found);
                }
                const cl = arr.length === 2 ? '6' : arr.length === 3 ? '4' : '3';
                setCol(cl);
                setCompetitionUsers(arr);
            }
            catch(exception){
                console.log("exception",exception);
            }
        }

        getCurrentCompetition().catch(console.error);
    }, [navigate, t]);

    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{position: 'relative'}}>
                {competitionError && <CompetitionError />}
                {finalWinner && <UserProfile it_is_a_match={matched} main_title={t('HERE_IS_THE_WINNER')} user={finalWinner} vote_user={false} />}
                {
                    !finalWinner && !competitionError && competitionUsers &&
                    <div className={`ui-block ${showingImagePopup ? 'd-none' : 'd-block'}`}>
                        <div className="ui-block-title">
                            <h6 className="title">
                                {t('WHICH_IS_YOUR_FAVOURITE')}
                            </h6>
                        </div>
                        <div className="ui-block-content">
                            <div className="row">
                                {
                                    competitionUsers.map((usr, index) =>
                                        <div key={index} className={`col col-${col}`}>
                                            <CompetitionUserProfile user_func={winnerSelected} om_image_clicked={onImageClick} user={usr}/>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={`modal ${showModal ? 'forced_show' : ''}`} role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">
                                <div className="modal-dialog window-popup update-header-photo" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header text-center">
                                            <h6 className="title text-center full-width">
                                                {
                                                    selectedWinner &&
                                                    <span>{t('IS')} {selectedWinner.name} {t('PROFILE_YOU_LIKE_MOST')}</span>
                                                }
                                            </h6>
                                        </div>

                                        <div className="modal-body">
                                            <div className="row full-width" style={{padding: '40px'}}>
                                                <div className="col col-6 text-center mobile_100_w">
                                                    <button onClick={winnerChosen} className="btn btn-primary btn-lg green_button">{t('YES_PROFILE_IS_MY_FAV')}</button>
                                                </div>
                                                <div className="col col-6 text-center mobile_100_w">
                                                    <button onClick={cancel} className="btn btn-danger btn-lg red_button">{t('NO_I_CHANGED_MY_MIND')}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
                <div className={`full_image_container ${showingImagePopup ? 'd-block' : 'd-none'}`}>
                    <div className="ui-block" style={{padding: '15px'}}>
                        <div className="row">
                            <div className="col col-12">
                                <div className="ui-block-title">
                                    <h5 className="title">
                                        {clickedUser &&
                                        <div>
                                            {clickedUser.name}, {getAge(clickedUser.birthday)}, {clickedUser.city_name}

                                        </div>}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div style={{position: 'relative'}}>
                            {
                                clickedUser?.pictures?.length &&
                                <img alt="" loading="lazy" src={`${API_URLS.USER_GET_IMAGE.url}/picture-${clickedUser.pictures[imagePosition]}`}  style={{width: '100%'}}/>
                            }
                            {
                                clickedUser?.pictures?.length > 1 &&
                                <div className="pic_navigator">
                                    <div className="pic_navigator_left">
                                        <img src="/img/icons8-chevron-left-32.png" alt="left" onClick={e => browseImages('b')}/>
                                    </div>
                                    <div className="pic_navigator_right">
                                        <img src="/img/icons8-chevron-right-32.png" alt="left" onClick={e => browseImages('f')} />
                                    </div>
                                </div>
                            }

                            <div className="full_image_close_container" onClick={imageClose}>
                                <i className="fa-solid fa-circle-xmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Competition;