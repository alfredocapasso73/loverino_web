import React from "react";
import LandingPageInfoBox from "../../../components/UI/LandingPageInfoBox";
import { useTranslation } from 'react-i18next';

const AccountCreated = () => {
    const { t } = useTranslation();
    return(
        <div>
            <LandingPageInfoBox
                h5="YOUR_ACCOUNT_HAS_BEEN_CREATED"
                h5_2="WE_SENT_INSTRUCTION_ON_HOW_TO_ACTIVATE_ACCOUNT"
                preTextLink="WHEN_YOU_ACTIVATED_YOUR_ACCOUNT_CAN_YOU_CLICK"
                afterTextLink="TO_LOGIN"
                link={t('URL_LOGIN')}
                linkText="HERE"
            />
        </div>
    );
}
export default AccountCreated;