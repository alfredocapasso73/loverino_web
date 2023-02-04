import React from "react";
import { useTranslation } from 'react-i18next';
import CommonMyPictures from "../MyProfile/CommonMyPictures";

const Step3 = () => {
    const { t } = useTranslation();

    return(
        <div className="row">
            <CommonMyPictures title={t('STEP_3_OF_3')} caller="step3"/>
        </div>
    );
}
export default Step3;