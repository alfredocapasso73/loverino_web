import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from 'react-i18next';
import {useNavigate, useParams} from "react-router-dom";
import FormRegistrationTabs from "../../../components/UI/FormRegistrationTabs";
import {api_get_restore_password, api_put_restore_password} from "../../../services/data_provider";
import FormTitle from "../../../components/UI/FormTitle";
import AlertError from "../../../components/UI/AlertError";
import FormInput from "../../../components/UI/FormInput";
import FormSubmitButton from "../../../components/UI/FormSubmitButton";
import {validate_restore_password} from '../../../helpers/Validation';
import {hide_error_and_disable_button, show_error_and_enable_button} from '../../../helpers/UICommon';

const Restore = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let { user_id, restore_string } = useParams();
    const [restoreApiCalled, setRestoreApiCalled] = useState(false);
    const [getRestoreSuccess, setGetRestoreSuccess] = useState(false);
    const [restorePasswordError, setRestorePasswordError] = useState('');
    const [restorePasswordButtonLoading, setRestorePasswordButtonLoading] = useState('');

    const passwordRef = useRef(null);
    const password2Ref = useRef(null);

    const performChangePassword = async () => {
        try{
            const result = await api_put_restore_password(passwordRef.current.value, user_id, restore_string);
            if(result.status !== 200){
                return show_error_and_enable_button(setRestorePasswordError, t(result.data.error), setRestorePasswordButtonLoading);
            }
            hide_error_and_disable_button(setRestorePasswordError, setRestorePasswordButtonLoading);
            navigate(t('URL_PASSWORD_RESTORED'));
        }
        catch(exception){
            console.log("exception",exception);
            return show_error_and_enable_button(setRestorePasswordError, t('GENERIC_SIGNUP_ERROR'), setRestorePasswordButtonLoading);
        }
    }

    const restorePasswordClicked = () => {
        const validation_result = validate_restore_password(passwordRef, password2Ref);
        if(!validation_result.success){
            return show_error_and_enable_button(setRestorePasswordError, t(validation_result.error), setRestorePasswordButtonLoading);
        }
        hide_error_and_disable_button(setRestorePasswordError, setRestorePasswordButtonLoading);
        setTimeout(performChangePassword, 1000);
    }


    useEffect(() => {
        const restorePassword = async () => {
            try{
                const result = await api_get_restore_password(user_id, restore_string);
                if(result.status !== 200){
                    navigate(t('URL_NOT_FOUND'));
                }
                setGetRestoreSuccess(true);
            }
            catch(exception){
                console.log('exception:',exception);
            }
        };

        if(!restoreApiCalled){
            setRestoreApiCalled(true);
            restorePassword().catch(console.error);
        }
    }, [restoreApiCalled, user_id, restore_string, navigate, t]);

    const unusedClick = () => {}

    return(
        <div className="registration-login-form">
            {
                getRestoreSuccess &&
                <div>
                    <FormRegistrationTabs formButtonClicked={unusedClick} caller="forgot"/>
                    <div className="tab-content">
                        <div className={`tab-pane fade show active`} role="tabpanel" aria-labelledby="login-tab">
                            <FormTitle title="ENTER_NEW_PASSWORD" />
                            <form className="content">
                                <div className="row">
                                    <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        {
                                            restorePasswordError &&
                                            <AlertError error={restorePasswordError} setError={setRestorePasswordError}/>
                                        }
                                        <FormInput label="INDEX_FORM_PASSWORD" ref_element={passwordRef} input_type="password" />
                                        <FormInput label="INDEX_FORM_PASSWORD_AGAIN" ref_element={password2Ref} input_type="password" />
                                        <FormSubmitButton
                                            formClicked={restorePasswordClicked}
                                            buttonColor="btn-purple"
                                            formButtonLoading={restorePasswordButtonLoading}
                                            buttonText="SAVE"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
export default Restore;