import React from "react";
import { useTranslation } from 'react-i18next';

const FormSubmitButton = (props) => {
    const { t } = useTranslation();

    return(
        <div className="form-group label-floating" style={{paddingTop: '20px'}}>
            <div onClick={props.formClicked} className={`btn ${props.buttonColor} btn-lg full-width ${props.formButtonLoading}`}>
                {t(props.buttonText)}
            </div>
        </div>
    );
}
export default FormSubmitButton;