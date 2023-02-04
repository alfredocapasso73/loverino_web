import React from "react";
import { useTranslation } from 'react-i18next';

const FormCheckbox = (props) => {
    const { t } = useTranslation();

    return(
        <div className="row">
            <div className="col-1">
                <input ref={props.ref_element} style={{width: '30px'}} type="checkbox" />
            </div>
            <div className="col-11">
                {props.preText && <span>{t(props.preText)}</span>}
                &nbsp;
                <a href={props.link} target="_blank">{t(props.linkText)}</a>
                &nbsp;
                {props.afterText && <span>{t(props.afterText)}</span>}
            </div>
        </div>
    );
}
export default FormCheckbox;