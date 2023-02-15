import React from "react";
import { useTranslation } from 'react-i18next';
import PagePreloader from "../../../components/Layout/PagePreloader";
import LandingPageHeader from "../../../components/Layout/LandingPageHeader";
import '../../../assets/css/theme-font.min.css';
import '../../../assets/Bootstrap/dist/css/bootstrap.css';
import '../../../assets/css/main.css';

const TermsAndCondition = () => {
    const { t } = useTranslation();

    return(
        <div className="landing-page">
            <PagePreloader />
            <div className="content-bg-wrap"></div>
            <LandingPageHeader />
            <div className="stunning-header">
                <div className="stunning-header-content">
                    <h1 className="stunning-header-title">
                        {t('TERMS_AND_CONDITION_HEADER')}
                    </h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col m-auto col-12 whole-page-in-container-light">
                            {t('COOKIE_POLICY_1')}
                        </div>
                        <div className="col m-auto col-12 whole-page-in-container-light">
                            {t('COOKIE_POLICY_2')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TermsAndCondition;