import React from "react";

const MatchError = (props) => {
    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    {props.error_message}
                </h6>
            </div>
        </div>
    );
}
export default MatchError;