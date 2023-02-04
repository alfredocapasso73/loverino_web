import React from "react";
import LandingPageInfoBox from "../../../components/UI/LandingPageInfoBox";

const AccountCreated = () => {
    return(
        <div>
            <LandingPageInfoBox
                h5="YOUR_ACCOUNT_HAS_BEEN_CREATED"
                h5_2="WE_SENT_INSTRUCTION_ON_HOW_TO_ACTIVATE_ACCOUNT"
                preTextLink="WHEN_YOU_ACTIVATED_YOUR_ACCOUNT_CAN_YOU_CLICK"
                afterTextLink="TO_LOGIN"
                link="/"
                linkText="HERE"
            />
        </div>
    );
}
export default AccountCreated;