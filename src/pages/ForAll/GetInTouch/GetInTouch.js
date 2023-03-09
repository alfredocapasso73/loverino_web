import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import PagePreloader from "../../../components/Layout/PagePreloader";
import LandingPageHeader from "../../../components/Layout/LandingPageHeader";
import {api_signup, get_in_touch} from '../../../services/data_provider';
import {show_error_and_enable_button} from "../../../helpers/UICommon";

const GetInTouch = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const [mailSent, setMailSent] = useState(false);

    const send = async () => {
        setAlert(false);
        if(!email || !message){
            setAlert(true);
            return;
        }
        setMailSent(true);
        try{
            const result = await get_in_touch(email, message);
            console.log('result:',result);
        }
        catch(exeption){
            console.log('exeption:',exeption);
        }

    }

    return(
        <div className="landing-page">
            <PagePreloader />
            <div className="content-bg-wrap"></div>
            <LandingPageHeader />
            <div className="stunning-header">
                <div className="stunning-header-content">
                    <h1 className="stunning-header-title">
                        {t('GET_IN_TOUCH')}
                    </h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col m-auto col-12 whole-page-in-container-light">
                            <div className="row">
                                {
                                    !mailSent &&
                                    <div className="col col-8 offset-2">
                                        <div style={{paddingBottom: '20px'}}>
                                            <input type="text" placeholder={t('YOUR_EMAIL')} onChange={e => setEmail(e.target.value)}/>
                                        </div>
                                        <div style={{paddingBottom: '20px'}}>
                                            <textarea style={{width: '100%'}} onChange={e => setMessage(e.target.value)} placeholder={t('YOUR_MESSAGE')}></textarea>
                                        </div>
                                        {
                                            alert &&
                                            <div className="alert alert-danger">
                                                {t('PLEASE_ENTER_EMAIL_AND_MSG')}
                                            </div>
                                        }
                                        <div style={{paddingBottom: '20px'}}>
                                            <button onClick={send} style={{width: '100%'}} className="btn btn-primary">{t('SEND')}</button>
                                        </div>
                                    </div>
                                }
                                {
                                    mailSent &&
                                    <div className="col col-8 offset-2 text-center">
                                        {t('THANK_FOR_GETTING_IN_TOUCH')}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GetInTouch;