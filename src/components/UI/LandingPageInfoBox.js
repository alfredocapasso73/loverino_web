import React from "react";
import { useTranslation } from 'react-i18next';
import {Link, Navigate} from "react-router-dom";

const LandingPageInfoBox = (props) => {
    const { t } = useTranslation();

    return(
        <div className="landing-page-info-box">
            <div className="title h5">
                {t(props.h5)}
                {props.h5_2 && <span><br />{t(props.h5_2)}</span>}
            </div>
            <div>
                {props.preTextLink && <span>{t(props.preTextLink)}</span>}
                &nbsp;<Link to={props.link}>{t(props.linkText)}</Link>&nbsp;
                {props.afterTextLink && <span>{t(props.afterTextLink)}</span>}
            </div>
        </div>
    );
}
export default LandingPageInfoBox;