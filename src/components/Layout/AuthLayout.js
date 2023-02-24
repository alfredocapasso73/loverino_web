import React, {useContext, useEffect, useState} from "react";
import {Navigate, useOutlet, Link, Outlet} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import '../../assets/css/theme-font.min.css';
import '../../assets/css/main.css';
import '../../assets/Bootstrap/dist/css/bootstrap.css';
import PagePreloader from "./PagePreloader";
import {api_get_me, api_refresh_token} from "../../services/data_provider";
import {
    get_your_profile_svg_icon,
    get_logout_svg_icon,
    get_open_right_menu_svg_icon,
    get_close_right_menu_svg_icon
} from "../../assets/Svg/Svg";
import AppContext from "../AppContext";

const AuthLayout = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const outlet = useOutlet();
    const globalContext = useContext(AppContext);
    const your_profile_svg_icon = get_your_profile_svg_icon();
    const logout_svg_icon = get_logout_svg_icon();
    const right_menu_open_svg_icon = get_open_right_menu_svg_icon();
    const right_menu_close_svg_icon = get_close_right_menu_svg_icon();

    const [avatar, setAvatar] = useState('');
    const [myName, setMyName] = useState('');
    const [showOutlet, setShowOutlet] = useState(false);
    const [rightMenuOpened, setRightMenuOpened] = useState(false);
    const [mobileSelectedMenu, setMobileSelectedMenu] = useState('suggestions');

    const mobileHeadMenuClicked = (name, url) => {
        setMobileSelectedMenu(name);
        navigate(url);
    }

    const goToLink = (url, is_start=false) => {
        if(is_start){
            setMobileSelectedMenu('suggestions');
        }
        else{
            setMobileSelectedMenu('');
        }
        setRightMenuOpened(false);
        navigate(url);
    }

    const setAvatarData = (user) => {
        if(user?.pictures?.length){
            const avatar_image = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/small-picture-${user.pictures[0]}`;
            globalContext.loggedInUserDetails.avatar = avatar_image;
            setAvatar(avatar_image);
        }
        if(user?.name){
            setMyName(user.name);
        }
    }

    const getUserDetails = async () => {
        try{
            const response = await api_get_me();
            if(response?.status === 500 && response?.data?.message === "jwt_expired"){
                const body = {user: window.localStorage.getItem('user'),refresh_token: window.localStorage.getItem('refresh_token')};
                const refresh_response = await api_refresh_token(body);
                if(refresh_response?.status === 200 && refresh_response?.data?.accessToken && refresh_response?.data?.refreshToken){
                    console.log("refresh_response",refresh_response);
                    localStorage.setItem("token", refresh_response.data.accessToken);
                    return navigate('/');
                }
                window.localStorage.removeItem('token');
                return navigate('/');
            }
            if(response.status === 200){
                console.log("response",response);
                globalContext.authToken = window.localStorage.getItem('token');
                globalContext.loggedInUserDetails = response.data.user;
                setAvatarData(response.data.user);
                setShowOutlet(true);
            }
        }
        catch(exception){
            console.log("exception",exception);
        }
    };

    useEffect(() => {
        getUserDetails().catch(console.error);
    });

    if(!window.localStorage.getItem('token')){
        return <Navigate to="/"/>
    }

    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('refresh_token');
        navigate('/');
    }

    const openRightMenu = (flag) => {
        setRightMenuOpened(flag);
    }

    return(
        <div className={`landing-page page-has-left-panels page-has-right-panels`}>
            <PagePreloader />
            <>
                <div className="fixed-sidebar left fixed-sidebar-responsive">
                    <div className="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
                        <div className="logo js-sidebar-open" onClick={e => goToLink(t('URL_YOUR_SUGGESTIONS'), true)}>
                            <img loading="lazy" src="img/logo.webp" alt="Olympus" width="34" height="34" />
                        </div>
                    </div>
                </div>

                <div className={`fixed-sidebar right fixed-sidebar-responsive mobile_right_menu ${rightMenuOpened ? 'open' : ''}`} id="sidebar-right-responsive">
                    <div className="fixed-sidebar-right sidebar--small">
                        <div className="js-sidebar-open">
                            {!rightMenuOpened && <span onClick={e => openRightMenu(true)}>{right_menu_open_svg_icon}</span>}
                            {rightMenuOpened && <span onClick={e => openRightMenu(false)}>{right_menu_close_svg_icon}</span>}
                        </div>
                    </div>
                    <div className="fixed-sidebar-right sidebar--large">
                        <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark">
                            <div className="ui-block-title ui-block-title-small">
                                <b>{t('MY_ACCOUNT')}</b>
                            </div>
                            <ul className="chat-users">
                                <li className="inline-items js-chat-open">
                                    <div className="a_div" onClick={e => goToLink(t('URL_SETTINGS'))}>
                                        {t('ABOUT_MYSELF')}
                                    </div>
                                </li>
                                <li className="inline-items js-chat-open">
                                    <div className="a_div" onClick={e => goToLink(t('URL_CHANGE_EMAIL'))}>
                                        {t('CHANGE_EMAIL')}
                                    </div>
                                </li>
                                <li className="inline-items js-chat-open">
                                    <div className="a_div" onClick={e => goToLink(t('URL_CHANGE_PASSWORD'))}>
                                        {t('CHANGE_PASSWORD')}
                                    </div>
                                </li>
                                <li className="inline-items js-chat-open">
                                    <div className="a_div" onClick={e => goToLink(t('URL_MY_PICTURES'))}>
                                        {t('MY_PICTURES')}
                                    </div>
                                </li>
                                <li className="inline-items js-chat-open">
                                    <div className="a_div" onClick={e => goToLink(t('URL_NOTIFICATION'))}>
                                        {t('NOTIFICATION')}
                                    </div>
                                </li>
                                <li className="inline-items js-chat-open">
                                    <div className="a_div" onClick={e => goToLink(t('URL_ACCOUNT'))}>
                                        {t('ACCOUNT')}
                                    </div>
                                </li>
                                <li className="inline-items js-chat-open">
                                    <div className="a_div" onClick={logout}>
                                        {t('LOGOUT')}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <header className="header header-responsive" id="site-header-responsive">
                    <div className="header-content-wrapper">
                        <ul className="nav nav-tabs mobile-notification-tabs" id="mobile-notification-tabs" role="tablist">
                            <li className={`nav-item ${mobileSelectedMenu === 'suggestions' ? 'selected_mobile_menu' : ''}`} onClick={e => mobileHeadMenuClicked('suggestions', t('URL_YOUR_SUGGESTIONS'))}>
                                <div className="nav-link" id="request-tab" data-bs-toggle="tab" role="tab" aria-controls="request" aria-selected="false">
                                    <div className="control-icon has-items">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 32" className="olymp-magnifying-glass-icon">
                                            <g>
                                                <path d="M20.809 3.57c-4.76-4.76-12.478-4.76-17.239 0s-4.76 12.48 0 17.239c4.76 4.76 12.48 4.76 17.239 0 4.76-4.759 4.76-12.478 0-17.239zM18.654 18.654c-3.57 3.57-9.361 3.57-12.93 0-3.57-3.57-3.57-9.359 0-12.93s9.361-3.57 12.93 0c3.57 3.569 3.57 9.359 0 12.93z"/>
                                                <path d="M24.022 21.907l2.154-2.156 2.157 2.155-2.154 2.156-2.157-2.155z"/>
                                                <path d="M28.34 28.364c-0.596 0.597-1.559 0.597-2.155 0l-6.464-6.464-0.834-0.852 4.3-4.3-1.312-1.314-6.466 6.466 8.62 8.619c1.783 1.783 4.683 1.783 6.464 0 1.783-1.781 1.783-4.681 0-6.464l-2.155 2.155c0.596 0.596 0.594 1.562 0 2.155z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </li>

                            <li className={`nav-item ${mobileSelectedMenu === 'match' ? 'selected_mobile_menu' : ''}`} onClick={e => mobileHeadMenuClicked('match', t('URL_MATCH'))}>
                                <div className="nav-link" id="request-tab" data-bs-toggle="tab" role="tab" aria-controls="request" aria-selected="false">
                                    <div className="control-icon has-items">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 32" className="olymp-heart-icon">
                                            <g>
                                                <path d="M23.111 21.333h3.556v3.556h-3.556v-3.556z"/>
                                                <path d="M32.512 2.997c-2.014-2.011-4.263-3.006-7.006-3.006-2.62 0-5.545 2.089-7.728 4.304-2.254-2.217-5.086-4.295-7.797-4.295-2.652 0-4.99 0.793-6.937 2.738-4.057 4.043-4.057 10.599 0 14.647 1.157 1.157 12.402 13.657 12.402 13.657 0.64 0.638 1.481 0.958 2.32 0.958s1.678-0.32 2.318-0.958l1.863-2.012-2.523-2.507-1.655 1.787c-2.078-2.311-11.095-12.324-12.213-13.442-1.291-1.285-2-2.994-2-4.811 0-1.813 0.709-3.518 2-4.804 1.177-1.175 2.54-1.698 4.425-1.698 0.464 0 2.215 0.236 5.303 3.273l2.533 2.492 2.492-2.532c2.208-2.242 4.201-3.244 5.196-3.244 1.769 0 3.113 0.588 4.496 1.97 1.289 1.284 1.998 2.99 1.998 4.804 0 1.815-0.709 3.522-1.966 4.775-0.087 0.085-0.098 0.094-1.9 2.041l-0.156 0.167 2.523 2.51 0.24-0.26c0 0 1.742-1.881 1.774-1.911 4.055-4.043 4.055-10.603-0.002-14.644z" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </li>
                            <li className={`nav-item ${mobileSelectedMenu === 'favorites' ? 'selected_mobile_menu' : ''}`} onClick={e => mobileHeadMenuClicked('favorites', t('URL_FAVORITES'))}>
                                <div className="nav-link" id="request-tab" data-bs-toggle="tab" role="tab" aria-controls="request" aria-selected="false">
                                    <div className="control-icon has-items">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="olymp-star-icon">
                                            <g>
                                                <path d="M24.029 27.192h3.2v3.2h-3.2v-3.2z"/>
                                                <path d="M31.88 11.91c-0.275-0.826-0.984-1.43-1.837-1.562l-8.309-1.28-3.611-7.763c-0.379-0.816-1.194-1.336-2.090-1.336-0.893 0-1.707 0.522-2.086 1.336l-3.613 7.763-8.309 1.28c-0.854 0.131-1.563 0.736-1.838 1.562-0.275 0.827-0.067 1.739 0.536 2.36l6.088 6.298-1.413 8.731c-0.142 0.88 0.226 1.762 0.947 2.277 0.397 0.28 0.862 0.424 1.328 0.424 0.384 0 0.766-0.098 1.115-0.291l7.243-4.037 4.768 2.656v-3.662l-4.768-2.658-7.184 4.005 1.378-8.517-1.114-1.154-4.922-5.090 8.323-1.282 0.723-1.552 2.798-6.014 3.52 7.566 8.326 1.283-6.038 6.243 0.733 4.53h3.242l-0.56-3.458 6.091-6.298c0.6-0.622 0.806-1.534 0.531-2.362z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </li>
                            <li className={`nav-item ${mobileSelectedMenu === 'refused' ? 'selected_mobile_menu' : ''}`} onClick={e => mobileHeadMenuClicked('refused', t('URL_REFUSED'))}>
                                <div className="nav-link" id="request-tab" data-bs-toggle="tab" role="tab" aria-controls="request" aria-selected="false">
                                    <div className="control-icon has-items">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 32" className="olymp-block-from-chat-icon">
                                            <g>
                                                <path d="M32 0h-28.8c-1.768 0-3.2 1.434-3.2 3.2v16c0 1.766 1.434 3.2 3.2 3.2 0 0 0.6 0 1.6 0v-3.2h-1.6v-16h28.8v19.2c1.766 0 3.2-1.434 3.2-3.2v-16c0-1.766-1.434-3.2-3.2-3.2zM20.8 22.4h1.6v-3.2h-1.6v3.2zM25.6 22.4h3.2v-3.2h-3.2v3.2z"/>
                                                <path d="M17.6 19.2l-9.6 6.626v-6.626h-3.2v12.8l12.8-9.6h3.2v-3.2z" />
                                                <path d="M22.125 8.938l-2.262-2.262-2.262 2.262-2.262-2.262-2.264 2.262 2.262 2.262-2.262 2.264 2.264 2.262 2.262-2.262 2.262 2.262 2.262-2.262-2.262-2.264z" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </header>

                <header className="header" id="site-header">
                    <div className="page-title">
                        <a href="/" className="logo">
                            <div className="img-wrap">
                                <img src="/img/logo.webp" alt="Monogomic" width="34" height="34" />
                            </div>
                            <div className="title-block" style={{marginLeft: '15px'}}>
                                <h6 className="logo-title">Loverino</h6>
                            </div>
                        </a>
                    </div>
                    <div className="header-content-wrapper">
                        <div className="control-block">
                            <div className="author-page author vcard inline-items more">
                                <div className="author-thumb">
                                    {
                                        avatar &&
                                        <img alt="author" src={avatar} width="36" height="36" className="avatar"/>
                                    }
                                    {
                                        !avatar && <i className="fas fa-user"></i>
                                    }
                                    <div className="more-dropdown more-with-triangle">
                                        <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark" data-ps-id="c202b05e-eb6f-8895-0500-2eb711c2dc8e">
                                            <div className="ui-block-title ui-block-title-small">
                                                <h6 className="title">{t('MY_ACCOUNT')}</h6>
                                            </div>
                                            <ul className="account-settings">
                                                <li>
                                                    <Link className="a_div" to={t('URL_SETTINGS')}>
                                                        {your_profile_svg_icon}
                                                        <span>{t('SETTINGS')}</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <div className="a_div" onClick={logout}>
                                                        {logout_svg_icon}
                                                        <span>{t('LOGOUT')}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <Link to={t('URL_AUTH_START_PAGE')} className="author-name fn">
                                    <div className="author-title">
                                        {myName}
                                        <svg className="olymp-dropdown-arrow-icon" viewBox="0 0 48 32">
                                            <g>
                                                <path d="M41.888 0.104l-17.952 19.064-17.952-19.064-5.984 6.352 23.936 25.44 23.936-25.44z" />
                                            </g>
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="header-spacer header-spacer-small desktop_header_space"></div>
                <div className="container" style={{marginTop: '15px'}}>
                    {
                        showOutlet &&
                        <Outlet>
                            {outlet}
                        </Outlet>
                    }
                </div>
            </>
        </div>
    );
}
export default AuthLayout;