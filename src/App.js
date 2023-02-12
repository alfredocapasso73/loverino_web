import React, {useState, useEffect} from 'react';
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import AppContext from "./components/AppContext";
import {api_validate_token} from './services/data_provider';

import AccountCreated from "./pages/NonAuth/AccountCreated/AccountCreated";
import Signup from "./pages/NonAuth/Signup/Signup";
import Login from "./pages/NonAuth/Login/Login";
import NotFound from "./pages/NonAuth/NotFound/NotFound";
import Error from "./pages/NonAuth/Error/Error";
import Activate from "./pages/NonAuth/Activate/Activate";
import TermsAndCondition from "./pages/NonAuth/TermsAndCondition/TermsAndCondition";
import ForgotPassword from "./pages/NonAuth/ForgotPassword/ForgotPassword";
import RestoreLinkSent from "./pages/NonAuth/RestoreLinkSent/RestoreLinkSent";
import Restore from "./pages/NonAuth/Restore/Restore";
import PasswordRestored from "./pages/NonAuth/PasswordRestored/PasswordRestored";

import Start from './pages/Auth/Start/Start';
import Suggestions from './pages/Auth/Suggestions/Suggestions';
import Match from './pages/Auth/Match/Match';
import UnMatched from './pages/Auth/Match/UnMatched';
import ReMatched from './pages/Auth/Match/ReMatched';
import Favorites from './pages/Auth/Favorites/Favorites';
import Refused from './pages/Auth/Refused/Refused';
import Competition from './pages/Auth/Suggestions/Competition';
import Step2 from './pages/Auth/Step2/Step2';
import Step3 from './pages/Auth/Step3/Step3';
import MyProfile from './pages/Auth/MyProfile/MyProfile';
import MyPictures from './pages/Auth/MyProfile/MyPictures';
import ChangePassword from './pages/Auth/MyProfile/ChangePassword';
import ChangeEmail from './pages/Auth/MyProfile/ChangeEmail';
import Notifications from './pages/Auth/MyProfile/Notifications';
import MyAccount from './pages/Auth/MyProfile/MyAccount';

import {useTranslation} from "react-i18next";

import AuthLayout from "./components/Layout/AuthLayout";
import LandingPage from "./components/Layout/LandingPage";

import './assets/css/theme-font.min.css';
import './assets/css/main.css';
import './assets/Bootstrap/dist/css/bootstrap.css';
import './assets/css/loverino.css';

const App = () => {
    const { t } = useTranslation();
    const [authToken, setAuthToken] = useState(undefined);
    const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
    const [globalSettings, setGlobalSettings] = useState({
        authToken: authToken
        ,loggedInUserDetails: loggedInUserDetails
    });

    useEffect(() => {

        const validateToken = async () => {
            try{
                const token_is_valid_request = await api_validate_token();
                if(token_is_valid_request?.success){
                    setAuthToken(localStorage.getItem("token"));
                    setLoggedInUserDetails(token_is_valid_request.data.user);
                    setGlobalSettings({
                        authToken: localStorage.getItem("token")
                        ,loggedInUserDetails: token_is_valid_request.data.user
                    });
                }
            }
            catch(exception){
                console.log('exception:',exception);
            }
        };

        if(localStorage.getItem("token")){
            validateToken().catch(console.error);
        }

    }, []);

    return (
        <div className="App">
            <AppContext.Provider value={globalSettings}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<LandingPage />}>
                            <Route path={t('URL_ACCOUNT_CREATED')} element={<AccountCreated />} />
                            <Route path="/" element={<Signup />} />
                            <Route path={t('URL_LOGIN')} element={<Login />} />
                            <Route path={t('URL_NOT_FOUND')} element={<NotFound />} />
                            <Route path={t('URL_ERROR_PAGE')} element={<Error />} />
                            <Route path="/activate/:user_id/:activation_string" element={<Activate />} />
                            <Route path={t('URL_FORGOT_PASSWORD')} element={<ForgotPassword />} />
                            <Route path={t('URL_RESTORE_LINK_SENT')} element={<RestoreLinkSent />} />
                            <Route path="/restore/:user_id/:restore_string" element={<Restore />} />
                            <Route path={t('URL_PASSWORD_RESTORED')} element={<PasswordRestored />} />
                        </Route>
                        <Route>
                            <Route path="/terms" element={<TermsAndCondition />}/>
                        </Route>
                        <Route element={<AuthLayout />}>
                            <Route path="/dashboard" element={<Start />} />
                            <Route path={t('URL_STEP2')} element={<Step2 />} />
                            <Route path={t('URL_STEP3')} element={<Step3 />} />
                            <Route path={t('URL_YOUR_SUGGESTIONS')} element={<Suggestions />} />
                            <Route path={t('URL_COMPETITION')} element={<Competition />} />
                            <Route path={t('URL_MATCH')} element={<Match />} />
                            <Route path={t('URL_UNMATCHED')} element={<UnMatched />} />
                            <Route path={t('URL_REMATCHED')} element={<ReMatched />} />
                            <Route path={t('URL_SETTINGS')} element={<MyProfile />} />
                            <Route path={t('URL_CHANGE_EMAIL')} element={<ChangeEmail />} />
                            <Route path={t('URL_CHANGE_PASSWORD')} element={<ChangePassword />} />
                            <Route path={t('URL_MY_PICTURES')} element={<MyPictures />} />
                            <Route path={t('URL_NOTIFICATION')} element={<Notifications />} />
                            <Route path={t('URL_ACCOUNT')} element={<MyAccount />} />
                            <Route path={`${t('URL_FAVORITES')}/:page`} element={<Favorites />} />
                            <Route path={`${t('URL_REFUSED')}/:page`} element={<Refused />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}
export default App;
