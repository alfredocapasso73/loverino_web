import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import {api_get_me} from "../../../services/data_provider";
import {useNavigate} from "react-router-dom";

const Start = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const getMe = async () => {
            try{
                const response = await api_get_me();
                const current_step = response?.data?.user?.current_step;
                switch(current_step){
                    case 'step2': navigate(t('URL_STEP2')); break;
                    case 'step3': navigate(t('URL_STEP3')); break;
                    default: console.log("go to suggestions");navigate(t('URL_YOUR_SUGGESTIONS')); break;
                }
            }
            catch(exception){
                console.log('exception:',exception);
            }
        };
        getMe().catch(console.error);
    }, [navigate, t]);

    return(
        <div className="row">
            <div className="spinner-border text-center" role="status" style={{marginRight: 'auto', marginLeft: 'auto'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
export default Start;