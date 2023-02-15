import React from "react";
import { useTranslation } from 'react-i18next';
import PagePreloader from "../../../components/Layout/PagePreloader";
import LandingPageHeader from "../../../components/Layout/LandingPageHeader";
import '../../../assets/css/theme-font.min.css';
import '../../../assets/Bootstrap/dist/css/bootstrap.css';
import '../../../assets/css/main.css';

const About = () => {
    const { t } = useTranslation();

    return(
        <div className="landing-page">
            <PagePreloader />
            <div className="content-bg-wrap"></div>
            <LandingPageHeader />
            <div className="stunning-header">
                <div className="stunning-header-content">
                    <h1 className="stunning-header-title">
                        {t('ABOUT_LOVERINO')}
                    </h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col m-auto col-12 whole-page-in-container-light">
                            {t('ABOUT_LOVERINO_COPY_1')}
                            <br />
                            {t('ABOUT_LOVERINO_COPY_2')}
                            <br />
                            {t('ABOUT_LOVERINO_COPY_3')}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default About;