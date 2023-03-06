import React from "react";

const Popup = (props) => {
    return(
        <div className={`modal forced_show`} role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">
            <div className="modal-dialog window-popup update-header-photo" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h6 className="title text-center full-width">
                            {props.title}
                        </h6>
                    </div>
                    <div className="modal-body">
                        <div className="row full-width" style={{padding: '40px'}}>
                            <div className="col col-6 text-center mobile_100_w">
                                <button className="btn btn-danger btn-lg btn-primary" onClick={props.onConfirm}>
                                    {props.confirmText}
                                </button>
                            </div>
                            <div className="col col-6 text-center mobile_100_w">
                                <button className="btn btn-lg btn-primary" onClick={props.onCancel}>
                                    {props.cancelText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Popup;