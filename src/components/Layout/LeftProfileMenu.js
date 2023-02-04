import React from "react";
import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';

const LeftProfileMenu = () => {
    const { t } = useTranslation();
    return(
        <div className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12 responsive-display-none">
            <div className="your-profile">
                <div className="ui-block-title ui-block-title-small">
                    <h6 className="title">
                        {t('SETTINGS')}
                    </h6>
                </div>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <ul className="your-profile-menu">
                                    <li>
                                        <Link to={t('URL_SETTINGS')} className="author-name fn">
                                            {t('ABOUT_MYSELF')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={t('URL_CHANGE_EMAIL')} className="author-name fn">
                                            {t('CHANGE_EMAIL')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={t('URL_CHANGE_PASSWORD')} className="author-name fn">
                                            {t('CHANGE_PASSWORD')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={t('URL_MY_PICTURES')} className="author-name fn">
                                            {t('MY_PICTURES')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={t('URL_NOTIFICATION')} className="author-name fn">
                                            {t('NOTIFICATION')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={t('URL_ACCOUNT')} className="author-name fn">
                                            {t('ACCOUNT')}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LeftProfileMenu;