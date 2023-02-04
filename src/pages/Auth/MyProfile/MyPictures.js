import React from "react";
import { useTranslation } from 'react-i18next';
import LeftProfileMenu from "../../../components/Layout/LeftProfileMenu";
import CommonMyPictures from "./CommonMyPictures";

const MyPictures = () => {
    const { t } = useTranslation();

    return(
        <div className="row">
            <LeftProfileMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <CommonMyPictures title={t('MY_PICTURES')} caller="my_pictures"/>
            </div>
        </div>
    );
}
export default MyPictures;