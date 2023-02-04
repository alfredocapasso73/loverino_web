import React, {useRef, useState} from "react";
import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import FormInput from "../../../components/UI/FormInput";
import AlertError from "../../../components/UI/AlertError";
import FormTitle from "../../../components/UI/FormTitle";
import FormCheckbox from "../../../components/UI/FormCheckbox";
import FormSubmitButton from "../../../components/UI/FormSubmitButton";
import {api_signup} from "../../../services/data_provider";
import {validate_signup} from '../../../helpers/Validation';
import {hide_error_and_disable_button, show_error_and_enable_button} from '../../../helpers/UICommon';
import FormBottomLink from "../../../components/UI/FormBottomLink";
import FormRegistrationTabs from "../../../components/UI/FormRegistrationTabs";

const Signup = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fieldsRef = {
        nameRef:useRef(null)
        ,emailRef:useRef(null)
        ,passwordRef:useRef(null)
        ,termsRef:useRef(null)
    };
    const [signupButtonLoading, setSignupButtonLoading] = useState('');
    const [signupError, setSignupError] = useState('');

    const performSignup = async () => {
        try{
            const body = {
                name: fieldsRef.nameRef.current.value
                ,email: fieldsRef.emailRef.current.value
                ,password: fieldsRef.passwordRef.current.value
            };
            const result = await api_signup(body);
            if(result.status !== 200){
                return show_error_and_enable_button(setSignupError, t(result.data.error), setSignupButtonLoading);
            }
            hide_error_and_disable_button(setSignupError, setSignupButtonLoading);
            navigate(t('URL_ACCOUNT_CREATED'));
        }
        catch(exception){
            console.log("exception",exception);
            return show_error_and_enable_button(setSignupError, t('GENERIC_SIGNUP_ERROR'), setSignupButtonLoading);
        }
    }

    const signupClicked = () => {
        const validation_result = validate_signup(fieldsRef);
        if(!validation_result.success){
            return show_error_and_enable_button(setSignupError, t(validation_result.error), setSignupButtonLoading);
        }
        hide_error_and_disable_button(setSignupError, setSignupButtonLoading);
        setTimeout(performSignup, 1000);
    }

    const formButtonClicked = () => {
        navigate(t('URL_LOGIN'));
    }

    return(
        <div>
            <div className="registration-login-form">
                <FormRegistrationTabs formButtonClicked={formButtonClicked} caller="signup"/>
                <div className="tab-content">
                    <div className={`tab-pane fade show active`} id="login" role="tabpanel" aria-labelledby="login-tab">
                        <FormTitle title="INDEX_FORM_CREATE_ACCOUNT" />
                        <form className="content">
                            <div className="row">
                                <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    {signupError && <AlertError error={signupError} setError={setSignupError}/>}
                                    <FormInput label="INDEX_FORM_NAME" ref_element={fieldsRef.nameRef} input_type="text" />
                                    <FormInput label="INDEX_FORM_EMAIL" ref_element={fieldsRef.emailRef} input_type="text" />
                                    <FormInput label="INDEX_FORM_PASSWORD" ref_element={fieldsRef.passwordRef} input_type="password" />
                                    <FormCheckbox
                                        ref_element={fieldsRef.termsRef}
                                        preText="SIGNUP_I_ACCEPT"
                                        afterText="SIGNUP_FOR_WEBPAGE"
                                        link="/terms"
                                        linkText="TERMS_AND_CONDITION"
                                    />
                                    <FormSubmitButton
                                        formClicked={signupClicked}
                                        buttonColor="btn-purple"
                                        formButtonLoading={signupButtonLoading}
                                        buttonText="COMPLETE_REGISTRATION"
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
                            <FormBottomLink
                                prePreText="DID_YOU_FORGET_PASSWORD"
                                preText="CLICK"
                                link="URL_FORGOT_PASSWORD"
                                linkText="HERE"
                                afterText="TO_RESTORE_PASSWORD"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;