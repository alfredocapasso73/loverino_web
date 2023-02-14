import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {api_get_me, api_get_user} from "../../../services/data_provider";
import MatchError from "./MatchError";
import UserProfile from "../Suggestions/UserProfile";

const ReMatched = () => {
    const { t } = useTranslation();
    const [errored, setErrored] = useState(false);
    const [myMatch, setMyMatch] = useState(undefined);

    const ensureOngoingMatch = async () => {
        try{
            const response = await api_get_me();
            if(response.status !== 200 || !response?.data?.user?.current_match){
                console.log("response.status !== 200 || !response?.data?.user?.current_match");
                return setErrored(true);
            }
            const my_current_match = response.data.user.current_match;
            const my_id = response.data.user._id;
            const match_response = await api_get_user(my_current_match);
            if(match_response.status !== 200 || !match_response?.data?.user?.current_match){
                console.log("match_response.status !== 200 || !match_response?.data?.user?.current_match");
                return setErrored(true);
            }
            if(my_id !== match_response.data.user.current_match){
                console.log("my_id !== match_response.data.user.current_match");
                return setErrored(true);
            }
            setMyMatch(match_response.data.user);

        }
        catch(exception){
            console.log('exception:',exception);
            setErrored(true);
        }
    };

    useEffect(() => {
        ensureOngoingMatch();
    }, []);


    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                {errored && <MatchError error_message={t('SOMETHING_WENT_WRONG')}/>}
                {myMatch && <UserProfile it_is_a_match={true} main_title={t('ALREADY_FOUND_NEW_MATCH')} sub_title={t('IF_FAVORITE_LIKES_YOU_WILL_BE_MATCH')} user={myMatch} vote_user={false} />}
            </div>
        </div>
    );
}
export default ReMatched;