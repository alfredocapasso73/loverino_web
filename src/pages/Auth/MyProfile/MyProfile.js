import React from "react";
import { useTranslation } from 'react-i18next';
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";
import CommonMyProfile from "./CommonMyProfile";

const MyProfile = () => {
    const { t } = useTranslation();

    return(
        <div className="row">
            <LeftProfileMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{height: '100vh'}}>
                <CommonMyProfile title={t('ABOUT_MYSELF')}/>
            </div>
        </div>
    );
}
export default MyProfile;