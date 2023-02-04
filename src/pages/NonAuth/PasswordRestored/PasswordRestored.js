import React from "react";
import LandingPageInfoBox from "../../../components/UI/LandingPageInfoBox";

const PasswordRestored = () => {
    return(
        <div>
            <LandingPageInfoBox
                h5="YOUR_PASSWORD_HAS_BEEN_RESTORED"
                h5_2="YOU_CAN_LOGIN_NOW"
                preTextLink="CLICK"
                afterTextLink="TO_LOGIN"
                link="/"
                linkText="HERE"
            />
        </div>
    );
}
export default PasswordRestored;