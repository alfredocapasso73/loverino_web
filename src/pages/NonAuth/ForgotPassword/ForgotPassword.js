import React, {useRef, useState} from "react";
import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import {api_forgot_password} from "../../../services/data_provider";
import {hide_error_and_disable_button, show_error_and_enable_button} from "../../../helpers/UICommon";
import FormRegistrationTabs from "../../../components/UI/FormRegistrationTabs";
import FormTitle from "../../../components/UI/FormTitle";
import AlertError from "../../../components/UI/AlertError";
import FormInput from "../../../components/UI/FormInput";
import FormSubmitButton from "../../../components/UI/FormSubmitButton";
import FormBottomLink from "../../../components/UI/FormBottomLink";

const ForgotPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const [forgotPasswordButtonLoading, setForgotPasswordButtonLoading] = useState('');
    const [forgotPasswordError, setForgotPasswordError] = useState('');

    const performForgotPassword = async () => {
        try{
            const body = {email: emailRef.current.value};
            const result = await api_forgot_password(body);
            if(result.status !== 200){
                return show_error_and_enable_button(setForgotPasswordError, t(result.data.error), setForgotPasswordButtonLoading);
            }
            hide_error_and_disable_button(setForgotPasswordError, setForgotPasswordButtonLoading);
            navigate(t('URL_RESTORE_LINK_SENT'));
        }
        catch(exception){
            console.log("exception",exception);
            return show_error_and_enable_button(setForgotPasswordError, t('GENERIC_SIGNUP_ERROR'), setForgotPasswordButtonLoading);
        }
    }

    const forgotPasswordClicked = async () => {
        if(!emailRef.current.value){
            return show_error_and_enable_button(setForgotPasswordError, t('SIGNUP_ERROR_MISSING_EMAIL'), setForgotPasswordButtonLoading);
        }
        hide_error_and_disable_button(setForgotPasswordError, setForgotPasswordButtonLoading);
        setTimeout(performForgotPassword, 1000);
    }

    const unusedClick = () => {}

    return(
        <div>
            <div className="registration-login-form">
                <FormRegistrationTabs formButtonClicked={unusedClick} caller="forgot"/>
                <div className="tab-content" id="registration-form-tabs-content">
                    <div className={`tab-pane fade show active`} role="tabpanel" aria-labelledby="login-tab">
                        <FormTitle title="ENTER_YOUR_EMAIL_TO_RESTORE" />
                        <form className="content">
                            <div className="row">
                                <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    {
                                        forgotPasswordError &&
                                        <AlertError error={forgotPasswordError} setError={setForgotPasswordError}/>
                                    }
                                    <FormInput label="INDEX_FORM_EMAIL" ref_element={emailRef} input_type="text" />
                                    <FormSubmitButton
                                        formClicked={forgotPasswordClicked}
                                        buttonColor="btn-purple"
                                        formButtonLoading={forgotPasswordButtonLoading}
                                        buttonText="RESTORE_PASSWORD_BUTTON"
                                    />
                                </div>
                            </div>
                            <FormBottomLink
                                prePreText="YOU_ALREADY_HAVE_AN_ACCOUNT"
                                preText="CLICK"
                                link="URL_LOGIN"
                                linkText="HERE"
                                afterText="TO_LOGIN"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;