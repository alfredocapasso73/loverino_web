import React from "react";
import LandingPageInfoBox from "../../../components/UI/LandingPageInfoBox";

const RestoreLinkSent = () => {
    return(
        <div>
            <LandingPageInfoBox
                h5="WE_SENT_AN_EMAIL_FOR_RESTORING_PASSWORD"
                h5_2="READ_INSTRUCTIONS_TO_RESET_PASSWORD"
                preTextLink=""
                afterTextLink=""
                link="/"
                linkText="CLICK_GERE_TO_GO_TO_LOGIN"
            />
        </div>
    );
}
export default RestoreLinkSent;