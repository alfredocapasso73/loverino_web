import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";
import {api_close_account} from "../../../services/data_provider";
import Popup from "../../../components/Layout/Popup";

const MyAccount = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const regret = () => {
        setShowPopup(false);
    }

    const callDeleteAccount = async () => {
        try{
            await api_close_account();
            window.localStorage.removeItem('token');
            setShowPopup(false);
            navigate('/');
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const deleteAccount = () => {
        setShowPopup(true);
    }

    return(
        <div className="row">
            {
                showPopup &&
                <Popup
                    onCancel={regret}
                    onConfirm={callDeleteAccount}
                    title={t('DO_YOU_REALLY_WANT_TO_DELETE_ACCOUNT')}
                    confirmText={t('YES')}
                    cancelText={t('NO')}
                />
            }
            <LeftProfileMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{height: '100vh'}}>
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title">
                            {t('ACCOUNT')}
                        </h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="row">
                            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="description-toggle text-center">
                                    <div className="description-toggle-content">
                                        <div className="h6">
                                            {t('WANT_TO_DELETE_ACCOUNT')}
                                        </div>
                                        <p>
                                            {t('WANT_TO_DELETE_ACCOUNT_TEXT')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <button onClick={deleteAccount} className="btn btn-primary btn-lg full-width">{t('DELETE_ACCOUNT')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyAccount;