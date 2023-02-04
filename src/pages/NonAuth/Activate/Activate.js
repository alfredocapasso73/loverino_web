import React, {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {api_activate_account} from '../../../services/data_provider';
import LandingPageInfoBox from "../../../components/UI/LandingPageInfoBox";

const Activate = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    let { user_id, activation_string } = useParams();
    const [activationSuccess, setActivationSuccess] = useState(true);
    const [activatedApiCalled, setActivatedApiCalled] = useState(false);

    useEffect(() => {
        const activateAccount = async () => {
            try{
                const result = await api_activate_account(user_id, activation_string);
                if(result.status !== 200){
                    return navigate(t('URL_NOT_FOUND'));
                }
                return setActivationSuccess(true);
            }
            catch(exception){
                console.log('exception:',exception);
            }
        };

        if(!activatedApiCalled){
            setActivatedApiCalled(true);
            activateAccount().catch(console.error);
        }
    }, []);

    return(
        <div>
            {
                activationSuccess &&
                <LandingPageInfoBox
                    h5="YOUR_ACCOUNT_HAS_BEEN_ACTIVATED"
                    h5_2=""
                    preTextLink=""
                    afterTextLink=""
                    link={t('URL_LOGIN')}
                    linkText="CLICK_GERE_TO_GO_TO_LOGIN"
                />
            }
        </div>
    );
}
export default Activate;