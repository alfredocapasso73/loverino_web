import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";

const Refused = () => {
    const { t } = useTranslation();

    useEffect(() => {
        console.log("Refused");
    }, []);


    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <div className="col col-4 text-center">
                            <h6 className="title">
                                {t('REFUSED')}
                            </h6>
                        </div>
                    </div>
                    <div className="ui-block-content">
                        <p className="text-center">
                            {t('REFUSED_TEXT')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Refused;