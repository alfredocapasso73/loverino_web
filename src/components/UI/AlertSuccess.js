import React from "react";
import { useTranslation } from 'react-i18next';
import {hide_success} from "../../helpers/UICommon";

const AlertSuccess = (props) => {
    const { t } = useTranslation();

    return(
        <div className="alert alert-success alert-dismissible fade show">
            <strong>{props.message}</strong>
            <button type="button" className="btn-close" onClick={e => hide_success(props.setSuccessAlert)}></button>
        </div>
    );
}
export default AlertSuccess;