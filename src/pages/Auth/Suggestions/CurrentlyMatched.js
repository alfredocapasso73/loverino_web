import React from "react";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

const CurrentlyMatched = (props) => {
    const { t } = useTranslation();
    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    {t('YOU_ARE_CURRENTLY_IN_A_MATCH')}
                </h6>
            </div>
            <div className="ui-block-content">
                <h4 className="title text-center">
                    <Link className="btn btn-primary btn-lg" to={t('URL_MATCH')}>{t('CLICK_TO_JOIN_MATCH')}</Link>
                </h4>
                <div className="text-center">
                    <h6>
                        {t('CURRENTLY_IN_A_MATCH_CONSEQUENCES')}
                    </h6>
                </div>
            </div>
        </div>
    );
}
export default CurrentlyMatched;