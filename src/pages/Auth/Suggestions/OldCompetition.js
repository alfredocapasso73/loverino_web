import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import CompetitionUserProfile from "./CompetitionUserProfile";
import UserProfile from "./UserProfile";

const OldCompetition = (props) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState(undefined);
    const [winnerHasBeenSelected, setWinnerHasBeenSelected] = useState(false);

    const winnerSelected = (id) => {
        const found = props.users.find(el => el._id === id);
        if(found){
            setSelectedWinner(found);
            setShowModal(true);
        }
    }

    const winnerChosen = () => {
        setShowModal(false);
        setWinnerHasBeenSelected(true);
    }

    const cancel = () => {
        setSelectedWinner(undefined);
        setShowModal(false);
    }

    return(
        <div className="ui-block">
            {
                winnerHasBeenSelected &&
                <UserProfile
                    main_title={t('HERE_IS_THE_WINNER')}
                    sub_title={t('IF_FAVORITE_LIKES_YOU_WILL_BE_MATCH')}
                    user={selectedWinner}
                />
            }
            {
                !winnerHasBeenSelected &&
                <div>
                    <div className="ui-block-title">
                        <h6 className="title">
                            {t('WHICH_IS_YOUR_FAVOURITE')}
                        </h6>
                    </div>
                    <div className="ui-block-content">
                        {
                            props.users.length === 2 &&
                            <div className="row">
                                <div className="col col-6">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[0]}/>
                                </div>
                                <div className="col col-6">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[1]}/>
                                </div>
                            </div>
                        }
                        {
                            props.users.length === 3 &&
                            <div className="row">
                                <div className="col col-4">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[0]}/>
                                </div>
                                <div className="col col-4">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[1]}/>
                                </div>
                                <div className="col col-4">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[2]}/>
                                </div>
                            </div>
                        }
                        {
                            props.users.length === 4 &&
                            <div className="row">
                                <div className="col col-3">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[0]}/>
                                </div>
                                <div className="col col-3">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[1]}/>
                                </div>
                                <div className="col col-3">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[2]}/>
                                </div>
                                <div className="col col-3">
                                    <CompetitionUserProfile user_func={winnerSelected} user={props.users[3]}/>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={`modal ${showModal ? 'forced_show' : ''}`} role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">
                        <div className="modal-dialog window-popup update-header-photo" role="document">
                            <div className="modal-content">
                                <div className="modal-header text-center">
                                    <h6 className="title">
                                        {
                                            selectedWinner &&
                                            <span>{t('IS')} {selectedWinner.name} {t('PROFILE_YOU_LIKE_MOST')}</span>
                                        }
                                    </h6>
                                </div>

                                <div className="modal-body">
                                    <div className="row" style={{width: '100%', padding: '40px'}}>
                                        <div className="col col-6 text-center">
                                            <button onClick={winnerChosen} className="btn btn-primary btn-lg">{t('YES_PROFILE_IS_MY_FAV')}</button>
                                        </div>
                                        <div className="col col-6 text-center">
                                            <button onClick={cancel} className="btn btn-danger btn-lg">{t('NO_I_CHANGED_MY_MIND')}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
export default OldCompetition;