import React from "react";
import '../../assets/css/theme-font.min.css';
import '../../assets/Bootstrap/dist/css/bootstrap.css';
import '../../assets/css/main.css';

const LandingPageHeader = () => {

    return(
        <>
            <div className="header--standard header--standard-landing" id="header--standard">
                <div className="container">
                    <div className="header--standard-wrap">
                        <a href="/" className="logo">
                            <div className="img-wrap">
                                <img src="/img/logo.webp" alt="Monogomic" width="34" height="34" />
                                <img src="/img/logo-colored-small.webp" width="34" height="34"
                                     alt="Loverino" className="logo-colored" />
                            </div>
                            <div className="title-block">
                                <h6 className="logo-title">Loverino</h6>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="header-spacer--standard"></div>
        </>
    );
}
export default LandingPageHeader;