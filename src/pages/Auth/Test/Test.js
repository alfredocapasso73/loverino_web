import React from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {useNavigate} from "react-router-dom";

const Test = () => {

    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <div className="col col-4 text-center">
                            <h6 className="title">
                                TEST
                            </h6>
                        </div>
                    </div>
                    <div className="ui-block-content">
                        <div className="partners_area">
                            area
                        </div>
                        <div className="partners_input_area">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" />
                                    <button className="btn btn-primary partners_send_btn" type="button">
                                        Button
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Test;