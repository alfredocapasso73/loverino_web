import React, {useRef, useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";
import {api_get_me, api_update_email} from "../../../services/data_provider";
import FormInput from "../../../components/UI/FormInput";
import {API_URLS} from "../../../services/api";

const ChangeEmail = () => {
    const { t } = useTranslation();
    const [emailChanged, setEmailChanged] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(false);
    const [apiErrorText, setApiErrorText] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const emailRef = useRef(null);
    const [errorEmail, setErrorEmail] = useState(false);

    const performPost = async () => {
        try{
            const body = {email: emailRef.current.value};
            const result = await api_update_email(body);
            setSubmitting(false);
            if(result.status !== 200){
                const error = result?.data?.error;
                setApiErrorMessage(true);
                setApiErrorText(error);
                return;
            }
            setEmailChanged(true);
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const saveChanges = () => {
        setApiErrorMessage(false);
        setErrorEmail(false);
        if(!emailRef.current.value){
            setErrorEmail(true);
            return;
        }
        setSubmitting(true);
        setTimeout(performPost, 1000);
    }

    const fetchMe = async () => {
        try{
            const response = await api_get_me();
            if(response?.status === 200){
                const email = response?.data?.user?.email;
                console.log('email:',email);
                setCurrentEmail(email);
            }
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    useEffect(() => {
        fetchMe().catch(console.error);
    }, []);

    return(
        <div className="row">
            <LeftProfileMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{height: '100vh'}}>
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title">
                            {t('CHANGE_EMAIL')}
                        </h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="row">
                            {
                                currentEmail &&
                                <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                                    <b>{t('YOUR_CURRENT_EMAIL')} {currentEmail}</b>
                                </div>
                            }

                            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                                <FormInput label="NEW_EMAIL" ref_element={emailRef} input_type="text" has_errored={errorEmail} error_message={t('SIGNUP_ERROR_MISSING_EMAIL')}/>
                            </div>
                            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                {
                                    apiErrorMessage  &&
                                    <div className="alert alert-danger">
                                        {t(apiErrorText)}
                                    </div>
                                }
                                {
                                    emailChanged &&
                                    <div className="alert alert-success text-center">
                                        {t('YOUR_EMAIL_HAS_BEEN_CHANGED')}
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
export default ChangeEmail;