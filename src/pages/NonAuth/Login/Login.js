import React, {useContext, useState, useRef} from "react";
import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import FormRegistrationTabs from "../../../components/UI/FormRegistrationTabs";
import FormTitle from "../../../components/UI/FormTitle";
import AlertError from "../../../components/UI/AlertError";
import AlertSuccess from "../../../components/UI/AlertSuccess";
import FormInput from "../../../components/UI/FormInput";
import FormSubmitButton from "../../../components/UI/FormSubmitButton";
import FormBottomLink from "../../../components/UI/FormBottomLink";
import {validate_login} from "../../../helpers/Validation";
import {
    hide_error,
    hide_error_and_disable_button,
    show_error,
    show_error_and_enable_button
} from "../../../helpers/UICommon";
import {api_login, api_resend_activation_link} from "../../../services/data_provider";
import AppContext from "../../../components/AppContext";

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const globalContext = useContext(AppContext);
    const fieldsRef = {
        emailRef:useRef(null)
        ,passwordRef:useRef(null)
    };
    const [loginButtonLoading, setLoginButtonLoading] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showActivationLinkButton, setShowActivationLinkButton] = useState(false);
    const [showActivationLinkHasBeenSent, setShowActivationLinkHasBeenSent] = useState(false);

    const resendActivationLink = async () => {
        try{
            const body = {email: fieldsRef.emailRef.current.value};
            const result = await api_resend_activation_link(body);

            if(result.status !== 200){
                return show_error(setLoginError, t(result.data.error));
            }
            hide_error(setLoginError);
            setShowActivationLinkButton(false);
            setShowActivationLinkHasBeenSent(true);
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const performLogin = async () => {
        try{
            const body = {
                email: fieldsRef.emailRef.current.value
                ,password: fieldsRef.passwordRef.current.value
            };
            const result = await api_login(body);
            if(result.status !== 200){
                if(result.data.error === 'not_activate_yet'){
                    setShowActivationLinkButton(true);
                }
                return show_error_and_enable_button(setLoginError, t(result.data.error), setLoginButtonLoading);
            }
            if(result.data.accessToken && result.data.user){
                console.log("result",result);
                hide_error_and_disable_button(setLoginError, setLoginButtonLoading);
                localStorage.setItem("token", result.data.accessToken);
                localStorage.setItem("refresh_token", result.data.refreshToken);
                localStorage.setItem("user", result.data.user._id);
                globalContext.loggedInUserDetails = result.data.user;
                globalContext.authToken = result.data.accessToken;
                return navigate(t('URL_AUTH_START_PAGE'));
            }
            return show_error_and_enable_button(setLoginError, t('GENERIC_SIGNUP_ERROR'), setLoginButtonLoading);
        }
        catch(exception){
            console.log("exception",exception);
            return show_error_and_enable_button(setLoginError, t('GENERIC_SIGNUP_ERROR'), setLoginButtonLoading);
        }
    }


    const loginClicked = () => {
        const validation_result = validate_login(fieldsRef);
        if(!validation_result.success){
            return show_error_and_enable_button(setLoginError, t(validation_result.error), setLoginButtonLoading);
        }
        hide_error_and_disable_button(setLoginError, setLoginButtonLoading);
        setTimeout(performLogin, 1000);
    }

    const formButtonClicked = () => {
        navigate(t('URL_SIGNUP'));
    }

    return(
        <>
            <div className="registration-login-form">
                <FormRegistrationTabs formButtonClicked={formButtonClicked} caller="login"/>
                <div className="tab-content">
                    <div className={`tab-pane fade show active`} role="tabpanel" aria-labelledby="profile-tab">
                        <FormTitle title="LOGIN_HERE" />
                        <form className="content">
                            <div className="row">
                                <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    {
                                        loginError &&
                                        <AlertError error={loginError} setError={setLoginError}/>
                                    }
                                    {
                                        showActivationLinkButton &&
                                        <div className="form-group label-floating text-center">
                                            <button className="btn bg-blue btn-sm" onClick={resendActivationLink}>
                                                {t('CLICK_TO_SEND_NEW_ACTIVATION_LINK')}
                                            </button>
                                        </div>
                                    }
                                    {
                                        showActivationLinkHasBeenSent &&
                                        <AlertSuccess message={t('ACTIVATION_LINK_RESENT')} setSuccessAlert={setShowActivationLinkHasBeenSent}/>
                                    }

                                    <FormInput label="INDEX_FORM_EMAIL" ref_element={fieldsRef.emailRef} input_type="text" />
                                    <FormInput label="INDEX_FORM_PASSWORD" ref_element={fieldsRef.passwordRef} input_type="password" />
                                    <FormSubmitButton
                                        formClicked={loginClicked}
                                        buttonColor="btn-primary"
                                        formButtonLoading={loginButtonLoading}
                                        buttonText="LOGIN"
                                    />

                                </div>
                            </div>
                            <FormBottomLink
                                prePreText="DID_YOU_FORGET_PASSWORD"
                                preText="CLICK"
                                link="URL_FORGOT_PASSWORD"
                                linkText="HERE"
                                afterText="TO_RESTORE_PASSWORD"
                            />
                            <FormBottomLink
                                prePreText="DONT_YOU_HAVE_ACCOUNT"
                                preText="CLICK"
                                link="URL_SIGNUP"
                                linkText="HERE"
                                afterText="TO_CREATE_ACCOUNT"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;