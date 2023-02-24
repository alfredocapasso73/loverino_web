import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {useNavigate} from "react-router-dom";
import UserProfile from "../Suggestions/UserProfile";
import {api_get_me, api_get_user} from "../../../services/data_provider";

const ViewMatch = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user ,setUser] = useState();

    useEffect(() => {
        const fetchMatch = async () => {
            try{
                const me = await api_get_me();
                if(me?.status !== 200 || !me?.data?.user?.current_match){
                    return navigate(t('URL_YOUR_SUGGESTIONS'));
                }
                const my_match = await api_get_user(me.data.user.current_match);
                console.log('my_match:',my_match);
                if(my_match?.status !== 200 || !my_match?.data?.user){
                    return navigate(t('URL_YOUR_SUGGESTIONS'));
                }
                setUser(my_match.data.user);
            }
            catch(exception){
                console.log('exception:',exception);
            }
        }
        fetchMatch().catch(console.log);

    }, [navigate, t]);

    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                {
                    user &&
                    <UserProfile main_title={t('YOUR_MATCH')} user={user} vote_user={false} go_back={t('URL_MATCH')}/>
                }
            </div>
        </div>
    );
}
export default ViewMatch;