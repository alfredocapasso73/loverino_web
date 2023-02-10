import React from "react";
import {hide_error} from "../../helpers/UICommon";

const AlertError = (props) => {

    return(
        <div className="alert alert-danger alert-dismissible fade show">
            <strong>{props.error}</strong>
            <button type="button" className="btn-close" onClick={e => hide_error(props.setError)}></button>
        </div>
    );
}
export default AlertError;