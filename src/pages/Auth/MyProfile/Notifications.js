import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";
import {api_get_me, api_update_notifications} from "../../../services/data_provider";

const Notifications = () => {
    const { t } = useTranslation();
    const [apiErrorMessage, setApiErrorMessage] = useState(false);
    const [apiErrorText, setApiErrorText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [notificationSaved, setNotificationSaved] = useState(false);

    const [newMatchChecked, setNewMatchChecked] = useState(false);
    const [newSuggestionChecked, setNewSuggestionChecked] = useState(false);

    useEffect(() => {
        const setDefaultValues = async () => {
            try{
                const response = await api_get_me();
                if(response.status === 200){
                    const user = response.data.user;
                    if(user.notify_new_match){
                        setNewMatchChecked(true);
                    }
                    if(user.notify_new_suggestions){
                        setNewSuggestionChecked(true);
                    }
                }
            }
            catch(exception){
                console.log("exception",exception);
            }
        }
        setDefaultValues().catch(console.error);
    }, []);

    const performPost = async () => {
        try{
            const body = {notify_new_match: newMatchChecked,notify_new_suggestions: newSuggestionChecked};
            const result = await api_update_notifications(body);
            setSubmitting(false);
            if(result.status !== 200){
                const error = result?.data?.error;
                setApiErrorMessage(true);
                setApiErrorText(error);
                return;
            }
            setNotificationSaved(true);
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const saveChanges = () => {
        setApiErrorMessage(false);
        setSubmitting(true);
        setTimeout(performPost, 1000);
    }

    return(
        <div className="row">
            <LeftProfileMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{height: '100vh'}}>
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title">
                            {t('NOTIFICATION')}
                        </h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="row">
                            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="description-toggle">
                                    <div className="description-toggle-content">
                                        <div className="h6">
                                            {t('NOTIFICATION_NEW_MATCH')}
                                        </div>
                                        <p>
                                            {t('NOTIFICATION_NEW_MATCH_TEXT')}
                                        </p>
                                    </div>
                                    <div className="togglebutton">
                                        <label>
                                            <input type="checkbox" checked={newMatchChecked} onChange={e => setNewMatchChecked(!newMatchChecked)}/>
                                            <span className="toggle"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="description-toggle">
                                    <div className="description-toggle-content">
                                        <div className="h6">
                                            {t('NOTIFICATION_NEW_SUGGESTIONS')}
                                        </div>
                                        <p>
                                            {t('NOTIFICATION_NEW_SUGGESTIONS_TEXT')}
                                        </p>
                                    </div>
                                    <div className="togglebutton">
                                        <label>
                                            <input type="checkbox" checked={newSuggestionChecked}  onChange={e => setNewSuggestionChecked(!newSuggestionChecked)} />
                                            <span className="toggle"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                {
                                    apiErrorMessage  &&
                                    <div className="alert alert-danger">
                                        {t(apiErrorText)}
                                    </div>
                                }
                                {
                                    notificationSaved &&
                                    <div className="alert alert-success text-center">
                                        {t('YOUR_NOTIFICATIONS_HAVE_BEEN_SAVED')}
                                    </div>
                                }

                                <button disabled={submitting} onClick={saveChanges} className="btn btn-primary btn-lg full-width">{t('SAVE')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Notifications;