import React, {useEffect, useState, useContext} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {api_get_competition, api_get_user, api_post_competition} from "../../../services/data_provider";
import {Link, useNavigate} from "react-router-dom";
import CompetitionUserProfile from "./CompetitionUserProfile";
import CompetitionError from "./CompetitionError";
import AppContext from "../../../components/AppContext";
import Popup from "../../../components/Layout/Popup";
import Carousel from "../../../components/Layout/Carousel";
import FinalWinner from "../Common/FinalWinner";

const Competition = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const globalContext = useContext(AppContext);
    const [finalWinner, setFinalWinner] = useState(undefined);
    const [competitionUsers, setCompetitionUsers] = useState([]);
    const [col, setCol] = useState('');
    const [competitionId, setCompetitionId] = useState('');
    const [competitionError, setCompetitionError] = useState(false);
    const [showingImagePopup, setShowingImagePopup] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState(undefined);
    const [clickedUser, setClickedUser] = useState();
    const [matched, setMatched] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [winnerConfirmText, setWinnerConfirmText] = useState('');

    const onImageClick = (user) => {
        setClickedUser(user);
        setShowingImagePopup(true);
    }

    const winnerChosen = async () => {
        try{
            const body = {
                competition_id: competitionId
                ,winner_id: selectedWinner._id
            };
            const response = await api_post_competition(body);
            setShowPopup(false);
            if(response.status !== 200){
                setCompetitionError(true);
                return;
            }
            const match_found = response?.data?.you_got_a_match;
            if(match_found){
                await api_get_user(match_found);
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
        setShowPopup(false);
    }

    const winnerSelected = (id) => {
        const found = competitionUsers.find(el => el._id === id);
        if(found){
            setSelectedWinner(found);
            setWinnerConfirmText(`${t('IS')} ${found.name} ${t('PROFILE_YOU_LIKE_MOST')}`);
            setShowPopup(true);
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

    const carousel_base_url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/big-picture`;

    return(
        <div className="row">
            {
                showPopup &&
                <Popup
                    onCancel={cancel}
                    onConfirm={winnerChosen}
                    title={winnerConfirmText}
                    confirmText={t('YES')}
                    cancelText={t('NO')}
                />
            }
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                {competitionError && <CompetitionError />}
                {finalWinner && <FinalWinner matched={matched} user={finalWinner}/>}
                {
                    !finalWinner && !competitionError && competitionUsers &&
                    <div className={`ui-block ${showingImagePopup ? 'd-none' : 'd-block'}`}>
                        <div className="ui-block-title">
                            <h6 className="title">
                                {t('WHICH_IS_YOUR_FAVOURITE')}
                                <div className="warning_text">{t('NB_SELECT_WINNER')}</div>
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
                        </div>
                    </div>
                }
                {
                    showingImagePopup &&
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h6 className="title">
                                {clickedUser.name}
                            </h6>
                        </div>
                        <div className="ui-block-content">
                            <Carousel user={clickedUser} closeImage={setShowingImagePopup}>
                                {
                                    clickedUser.pictures.map((pic, index) =>
                                        <img key={index} className="carousel_img" src={`${carousel_base_url}-${pic}`} alt="placeholder" />
                                    )
                                }
                            </Carousel>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default Competition;