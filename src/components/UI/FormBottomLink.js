import React from "react";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

const FormBottomLink = (props) => {
    const { t } = useTranslation();

    return(
        <p className="text-center">
            {props.prePreText && <span>{t(props.prePreText)}&nbsp;</span>}
            {props.preText && <span>{t(props.preText)}&nbsp;</span>}
            <Link to={t(props.link)}>{t(props.linkText)}</Link>
            {props.afterText && <span>&nbsp;{t(props.afterText)}&nbsp;</span>}
        </p>
    );
}
export default FormBottomLink;