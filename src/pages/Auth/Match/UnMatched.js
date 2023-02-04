import React, {useEffect, useState, useRef, useLayoutEffect} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {useNavigate} from "react-router-dom";
import {api_get_me, api_get_user, api_get_messages, api_cancel_match} from "../../../services/data_provider";
import MatchError from "./MatchError";
import {API_URLS} from "../../../services/api";
import {get_more_svg_icon} from '../../../assets/Svg/Svg';
import {io} from "socket.io-client";

const UnMatched = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
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