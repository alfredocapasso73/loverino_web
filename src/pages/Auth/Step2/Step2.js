import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import {api_get_me} from "../../../services/data_provider";
import {useNavigate} from "react-router-dom";
import CommonMyProfile from "../MyProfile/CommonMyProfile";

const Step2 = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const getMe = async () => {
            try{
                const response = await api_get_me();
                const current_step = response?.data?.user?.current_step;
                if(current_step !== 'step2'){
                    navigate('/dashboard');
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
            <div className="col col-xl-12 col-lg-12 order-lg-1 col-md-9 col-sm-6 col-12" style={{backgroundColor: 'white', padding: '15px'}}>
                <CommonMyProfile title={t('STEP_2_OF_3')}/>
            </div>
        </div>
    );
}
export default Step2;