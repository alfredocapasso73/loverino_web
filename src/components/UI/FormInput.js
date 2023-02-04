import React from "react";
import { useTranslation } from 'react-i18next';

const FormInput = (props) => {
    const { t } = useTranslation();

    return(
        <div className="form-group label-floating">
            <label className="control-label">
                {t(props.label)}
            </label>
            <input disabled={props.disabled} ref={props.ref_element} className="form-control form-control-danger" type={props.input_type} autoComplete="new-password"  />
            <div className={`invalid-feedback ${props.has_errored ? 'd-block' : 'd-none'}`}>
                {props.error_message}
            </div>
        </div>
    );
}
export default FormInput;