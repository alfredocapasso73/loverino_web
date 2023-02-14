import React from "react";
import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';

const LeftAuthMenu = (props) => {
    const { t } = useTranslation();
    return(
        <div className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-1 col-sm-12 col-12 auth_left_menu_visibility">
            <div className="ui-block">
                <div className="your-profile">
                    <div className="ui-block-title">
                        <Link to={t('URL_YOUR_SUGGESTIONS')} className="h6 title">
                            {t('LINK_SUGGESTION')}
                        </Link>
                    </div>
                    <div className="ui-block-title">
                        <Link to={t('URL_MATCH')} className="h6 title">
                            {t('LINK_MATCH')}
                        </Link>
                    </div>
                    <div className="ui-block-title">
                        <Link to={`${t('URL_FAVORITES')}`} className="h6 title">
                            {t('LINK_FAVORITES')}
                        </Link>
                    </div>
                    <div className="ui-block-title">
                        <Link to={`${t('URL_REFUSED')}`} className="h6 title">
                            {t('LINK_REFUSED')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LeftAuthMenu;