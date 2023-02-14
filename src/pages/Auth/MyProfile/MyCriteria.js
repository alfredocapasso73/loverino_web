import React, {useRef, useState} from "react";
import { useTranslation } from 'react-i18next';
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";

const MyCriteria = () => {
    const { t } = useTranslation();

    return(
        <div className="row">
            <LeftProfileMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{height: '100vh'}}>
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title">
                            {t('WHAT_I_SEARCH')}
                        </h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="row">
                            WHAT_I_SEARCH
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyCriteria;