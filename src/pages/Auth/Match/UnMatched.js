import React, {useEffect, useContext} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {useNavigate} from "react-router-dom";
import AppContext from "../../../components/AppContext";

const UnMatched = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const globalContext = useContext(AppContext);

    useEffect(() => {
        const loggedInUserDetails = globalContext.loggedInUserDetails;
        loggedInUserDetails.current_match = '';
        globalContext.loggedInUserDetails = loggedInUserDetails;
        console.log("UnMatched");
    }, []);


    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <div className="col col-4 text-center">
                            <h6 className="title">
                                {t('YOU_ARE_NOW_UNMATCHED')}
                            </h6>
                        </div>
                    </div>
                    <div className="ui-block-content">
                        <p className="text-center">
                            {t('DONT_GIVE_UP')}
                        </p>
                        <div className="text-center">
                            <button className="btn btn-primary btn-lg" onClick={e => navigate(t('URL_YOUR_SUGGESTIONS'))}>{t('TAKE_ME_TO_NEW_SUGGESTIONS')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UnMatched;