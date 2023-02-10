import React, {useEffect, useState} from "react";
import {get_login_svg_icon_data, get_signup_svg_icon_data} from "../../assets/Svg/Svg";

const FormRegistrationTabs = (props) => {
    const [loginIconDataSvg, setLoginIconDataSvg] = useState({});
    const [signupIconDataSvg, setSignupIconDataSvg] = useState({});

    const manageClick = (element) => {
        if(
            (element === 'signup' && props.caller === 'signup')
            ||
            (element === 'login' && props.caller === 'login')
        ){
            props.formButtonClicked();
        }
    }

    useEffect(() => {
        switch(props.caller){
            case 'signup':
                setLoginIconDataSvg(get_login_svg_icon_data(true));
                setSignupIconDataSvg(get_signup_svg_icon_data(false));
                break;
            case 'login':
                setLoginIconDataSvg(get_login_svg_icon_data(false));
                setSignupIconDataSvg(get_signup_svg_icon_data(true));
                break;
            case 'forgot':
                setLoginIconDataSvg(get_login_svg_icon_data(false));
                setSignupIconDataSvg(get_signup_svg_icon_data(false));
                break;
            default: console.log("");
        }

    }, [props.caller]);

    return(
        <div>
            <ul className="nav nav-tabs" id="registration-form-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <div className={`nav-link active`} id="login-tab" data-bs-toggle="tab" onClick={e => manageClick('login')}
                       role="tab" aria-controls="login" aria-selected="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox={loginIconDataSvg.viewBox}>
                            <g fill={loginIconDataSvg.fill}>
                                <path d={loginIconDataSvg.path}/>
                            </g>
                        </svg>
                    </div>
                </li>
                <li className="nav-item" role="presentation">
                    <div className={`nav-link`} id="profile-tab" data-bs-toggle="tab" onClick={e => manageClick('signup')}
                       role="tab" aria-controls="profile" aria-selected="false">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox={signupIconDataSvg.viewBox}>
                            <g fill={signupIconDataSvg.fill}>
                                <path d={signupIconDataSvg.path}/>
                            </g>
                        </svg>
                    </div>
                </li>
            </ul>
        </div>
    );
}
export default FormRegistrationTabs;