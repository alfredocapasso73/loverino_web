import React, {useRef, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";
import FormInput from "../../../components/UI/FormInput";
import {api_update_password} from "../../../services/data_provider";

const ChangePassword = () => {
    const { t } = useTranslation();
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [apiErrorMessages, setApiErrorMessages] = useState([]);

    const passwordRef = useRef(null);
    const [errorPassword, setErrorPassword] = useState(false);

    const password2Ref = useRef(null);
    const [errorPassword2, setErrorPassword2] = useState(false);

    const [passwordRequiredErrorMessage, setPasswordRequiredErrorMessage] = useState(t('SIGNUP_ERROR_MISSING_PASSWORD'));

    const performPost = async () => {
        try{
            const body = {password: passwordRef.current.value};
            const result = await api_update_password(body);
            setSubmitting(false);
            if(result.status !== 200){
                const errors = result?.data?.errors;
                setApiErrorMessages(errors);
                return;
            }
            setPasswordChanged(true);
            console.log("result",result);
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const saveChanges = () => {
        setApiErrorMessages([]);
        setErrorPassword(false);
        setErrorPassword2(false);
        if(!passwordRef.current.value){
            setErrorPassword(true);
            return;
        }
        if(passwordRef.current.value.length < 6){
            setPasswordRequiredErrorMessage(t('SIGNUP_ERROR_BAD_PASSWORD'));
            setErrorPassword(true);
            return;
        }
        if(!password2Ref.current.value){
            setErrorPassword2(true);
            return;
        }
        if(passwordRef.current.value !== password2Ref.current.value){
            setPasswordRequiredErrorMessage(t('PASSWORDS_DONT_MATCH'));
            setErrorPassword(true);
            return;
        }
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
                            {t('CHANGE_PASSWORD')}
                        </h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="row">
                            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                <FormInput label="NEW_PASSWORD" ref_element={passwordRef} input_type="password" has_errored={errorPassword} error_message={passwordRequiredErrorMessage}/>
                            </div>
                            <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                <FormInput label="CONFIRM_NEW_PASSWORD" ref_element={password2Ref} input_type="password" has_errored={errorPassword2} error_message={t('SIGNUP_ERROR_MISSING_PASSWORD')}/>
                            </div>

                            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                {
                                    apiErrorMessages.length > 0 &&
                                    <div className="alert alert-danger">
                                        {
                                            apiErrorMessages.map((error, index) =>
                                                <div key={index}>{t(error)}</div>
                                            )
                                        }
                                    </div>
                                }
                                {
                                    passwordChanged &&
                                    <div className="alert alert-success text-center">
                                        {t('YOUR_PASSWORD_HAS_BEEN_CHANGED')}
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
export default ChangePassword;