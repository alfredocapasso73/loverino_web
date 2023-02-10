import React, {useEffect, useState} from "react";
import { useOutlet, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PagePreloader from "./PagePreloader";
import LandingPageHeader from "./LandingPageHeader";
import '../../assets/css/theme-font.min.css';
import '../../assets/Bootstrap/dist/css/bootstrap.css';
import '../../assets/css/main.css';

const LandingPage = () => {
    const { t } = useTranslation();
    const outlet = useOutlet();
    const [cookieConsented, setCookieConsented] = useState(false);

    useEffect(() => {
        if(window.localStorage.getItem('consent')){
            setCookieConsented(true);
        }
    }, []);

    const consentCookie = () => {
        setCookieConsented(true);
        window.localStorage.setItem('consent', true);
    }

    if(window.localStorage.getItem('token')){
        return <Navigate to="/dashboard"/>
    }

    return(
        <div className="landing-page">
            <PagePreloader />
            <div className="content-bg-wrap"></div>
            <LandingPageHeader />
            <div className="container">
                <div className="row display-flex">
                    <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"  style={{zIndex: 1}}>
                        <div className="landing-content text-center">
                            <h1>{t('PAGE_MAIN_TITLE')}</h1>
                            <p>{t('PAGE_MAIN_SUB_TITLE')}</p>
                        </div>
                    </div>
                    <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div>
                            {outlet}
                        </div>
                    </div>
                </div>
            </div>
            {
                !cookieConsented &&
                <div className="alert text-center cookiealert show">
                    {t('COOKIE_CONSENT_TEXT')}&nbsp;
                    <span className="a_div">{t('READ_MORE')}</span>&nbsp;
                    <button type="button" className="btn btn-primary btn-sm acceptcookies" onClick={consentCookie}>
                        {t('I_CONSENT')}
                    </button>
                </div>
            }
        </div>
    );
}
export default LandingPage;