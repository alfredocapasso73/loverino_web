import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";
import {api_close_account} from "../../../services/data_provider";

const MyAccount = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [closeAccountFailed, setCloseAccountFailed] = useState(false);

    const regret = () => {
        setShowModal(false);
    }

    const callDeleteAccount = async () => {
        try{
            const result = await api_close_account();
            setIsSubmitting(false);
            if(result.status !== 200){
                setCloseAccountFailed(true);
            }
            else{
                window.localStorage.removeItem('token');
                setShowModal(false);
                navigate('/');
            }
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const confirmDeleteAccount = () => {
        setIsSubmitting(true);
        setTimeout(callDeleteAccount, 1000);
    }

    const deleteAccount = () => {
        setShowModal(true);
    }

    return(
        <div className="row">
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
            <div className={`modal ${showModal ? 'forced_show' : ''}`} role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">
                <div className="modal-dialog window-popup update-header-photo" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h6 className="title">
                                {t('DO_YOU_REALLY_WANT_TO_DELETE_ACCOUNT')}
                            </h6>
                        </div>

                        <div className="modal-body">
                            <div className="row" style={{width: '100%', padding: '40px'}}>
                                {
                                    isSubmitting &&
                                    <div className="text-center">
                                        <div className="spinner-border text-center" role="status" style={{marginRight: 'auto', marginLeft: 'auto'}}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                }
                                {
                                    closeAccountFailed &&
                                    <div className="alert alert-danger text-center">
                                        {t('CLOSING_ACCOUNT_FAILED')}
                                    </div>
                                }
                                <div className="col col-6 text-center">
                                    <button disabled={isSubmitting} onClick={confirmDeleteAccount} className="btn btn-danger btn-lg">{t('YES_DELETE_MY_ACCOUNT')}</button>
                                </div>
                                <div className="col col-6 text-center">
                                    <button disabled={isSubmitting} onClick={regret} className="btn btn-primary btn-lg">{t('NO_DONT_DELETE_ACCOUNT')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyAccount;