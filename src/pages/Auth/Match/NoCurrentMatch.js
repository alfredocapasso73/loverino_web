import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {useNavigate} from "react-router-dom";

const NoCurrentMatch = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("UnMatched");
    }, []);


    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <div className="col col-4 text-center">
                    <h6 className="title">
                        {t('NO_CURRENT_MATCHES')}
                    </h6>
                </div>
            </div>
            <div className="ui-block-content">
                <p className="text-center">
                    {t('GO_FIND_AMONG_SUGGESTIONS')}
                </p>
                <div className="text-center">
                    <button className="btn btn-primary btn-lg" onClick={e => navigate(t('URL_YOUR_SUGGESTIONS'))}>{t('TAKE_ME_TO_NEW_SUGGESTIONS')}</button>
                </div>
            </div>
        </div>
    );
}
export default NoCurrentMatch;