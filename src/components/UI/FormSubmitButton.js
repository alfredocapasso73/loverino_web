import React from "react";
import { useTranslation } from 'react-i18next';

const FormSubmitButton = (props) => {
    const { t } = useTranslation();

    return(
        <div className="form-group label-floating" style={{paddingTop: '20px'}}>
            <a onClick={props.formClicked} className={`btn ${props.buttonColor} btn-lg full-width ${props.formButtonLoading}`}>
                {t(props.buttonText)}
            </a>
        </div>
    );
}
export default FormSubmitButton;