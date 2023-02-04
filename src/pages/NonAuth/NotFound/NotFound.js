import React from "react";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

const NotFound = () => {
    const { t } = useTranslation();
    return(
        <div>
            <div className="landing-page-info-box">
                <div className="page-404-content">
                    <img loading="lazy" src="img/404.webp" alt="photo" width="636" height="304" />
                        <div className="crumina-module crumina-heading align-center">
                            <h2 className="h1 heading-title">
                                <span className="c-primary">
                                    {t('SOMETHING_WENT_WRONG')}
                                </span>
                            </h2>
                            <p className="heading-text">
                                {t('NOT_FOUND_MESSAGE')}
                            </p>
                        </div>
                        <div>
                            <Link className="btn btn-primary btn-lg" to="/">{t('GO_TO_START_PAGE')}</Link>
                        </div>
                </div>
            </div>
        </div>
    );
}
export default NotFound;