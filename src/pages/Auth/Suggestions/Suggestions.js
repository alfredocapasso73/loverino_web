import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {api_get_suggestions, api_post_vote, api_get_competition, api_get_user} from "../../../services/data_provider";
import NoSuggestionLiked from "./NoSuggestionLiked";
import UserProfile from "./UserProfile";
import SuggestionError from "./SuggestionError";
import CurrentlyMatched from "./CurrentlyMatched";
import {useNavigate} from "react-router-dom";
import currentlyMatched from "./CurrentlyMatched";

const Suggestions = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isCurrentlyMatched, setIsCurrentlyMatched] = useState(false);
    const [didNotLikeAnybody, setDidNotLikeAnybody] = useState(false);
    const [nextSuggestionsAvailableWithinMinutes, setNextSuggestionsAvailableWithinMinutes] = useState(0);
    const [noSuggestionsFound, setNoSuggestionsFound] = useState(false);
    const [suggestionError, setSuggestionError] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [winner, setWinner] = useState(undefined);
    const [suggestionId, setSuggestionId] = useState('');
    const [numberOfSuggestions, setNumberOfSuggestions] = useState(0);
    const [currentViewedSuggestion, setCurrentViewedSuggestion] = useState(0);
    const [currentSuggestionNumberTitle, setCurrentSuggestionNumberTitle] = useState('');
    const [matched, setMatched] = useState(false);



    const voteUser = async (vote) => {
        try{
            const body = {
                suggestion_id: suggestionId
                ,voted_user_id: suggestions[currentViewedSuggestion].user_id
                ,vote: vote
            };
            const response = await api_post_vote(body);
            if(response.status === 200){
                if((currentViewedSuggestion+1) >= suggestions.length){
                    if(response?.data?.winner){
                        setSuggestions([]);
                        setWinner(response.data.winner);
                        const match_found = response?.data?.you_got_a_match;
                        if(match_found){
                            const match = await api_get_user(match_found);
                            console.log("match",match);
                            setMatched(true);
                        }
                        return;
                    }
                    const competition = await api_get_competition();
                    console.log('competition:',competition);
                    if(competition.status === 200 && competition?.data?.competition_id){
                        return navigate(t('URL_COMPETITION'));
                    }
                    console.log("Well, this means user voted no to everybody");
                    console.log("Say we are sorry");
                    const suggestions = await api_get_suggestions();
                    if(suggestions?.data?.error === 'wait_until_next_suggestion'){
                        const minutes = suggestions?.data?.next_suggestion_possible_within_minutes || 0;
                        setNextSuggestionsAvailableWithinMinutes(minutes);
                    }
                    setDidNotLikeAnybody(true);
                }
                else{
                    const string = `${t('SUGGESTIONS_FOR_YOU')} - ${currentViewedSuggestion + 2} ${t('OF')} ${suggestions.length}`;
                    setCurrentSuggestionNumberTitle(string);
                    setCurrentViewedSuggestion(currentViewedSuggestion + 1);
                }
            }
        }
        catch(exception){
            console.log('exception:',exception);
        }
    }

    const initSuggestions = async () => {
        try{
            const current_competition = await ensureNoOngoingCompetition();
            if(current_competition){
                return navigate(t('URL_COMPETITION'));
            }
            const response = await api_get_suggestions();
            if(response.status !== 200){
                setSuggestionError(true);
                console.log('something went wrong when fetching suggestions:',response);
                return;
            }
            if(response?.data?.error === 'wait_until_next_suggestion'){
                const minutes = response?.data?.next_suggestion_possible_within_minutes || 0;
                setNextSuggestionsAvailableWithinMinutes(minutes);
                setNoSuggestionsFound(true);
                console.log('no suggestions at the moment');
                return;
            }
            if(response?.data?.error === 'currently_in_a_match'){
                console.log('currently_in_a_match ok?');
                setIsCurrentlyMatched(true);
                return;
            }

            const suggestions_users = response?.data?.suggestions?.users || [];
            if(!suggestions_users.length){
                console.log('no users, need to tell the user time left to next suggestions');
                return;
            }
            const unread_suggestions = suggestions_users.filter(el => el.status === 'unread');
            if(!unread_suggestions.length){
                console.log('no unread suggestions, uhmmmmm');
                return;
            }
            setSuggestionId(response.data.suggestions._id);
            console.log('response',response);
            console.log('unread_suggestions',unread_suggestions);
            console.log('unread_suggestions.length',unread_suggestions.length);
            setSuggestions(unread_suggestions);
            setNumberOfSuggestions(unread_suggestions.length);
            const string = `${t('SUGGESTIONS_FOR_YOU')} - 1 ${t('OF')} ${unread_suggestions.length}`;
            setCurrentSuggestionNumberTitle(string);
            setNoSuggestionsFound(false);
        }
        catch(exception){
            console.log('exception:',exception);
            setSuggestionError(true);
        }
    }

    const ensureNoOngoingCompetition = async () => {
        try{
            const competition = await api_get_competition();
            if(competition.status === 200 && competition?.data?.competition_id){
                return true;
            }
            return false;
        }
        catch(exception){
            console.log('exception:',exception);
        }
    }

    useEffect(() => {
        initSuggestions().catch(console.error);
    }, []);

    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                {isCurrentlyMatched && <CurrentlyMatched />}
                {suggestionError && <SuggestionError />}
                {noSuggestionsFound && <NoSuggestionLiked minutes_left={nextSuggestionsAvailableWithinMinutes} main_title={t('NO_SUGGESTIONS_FOR_YOU_AT_THE_MOMENT')}/>}
                {didNotLikeAnybody && <NoSuggestionLiked minutes_left={nextSuggestionsAvailableWithinMinutes} main_title={t('NO_SUGGESTION_LIKED')}/>}
                {!didNotLikeAnybody && suggestions.length > 0 && <UserProfile main_title={currentSuggestionNumberTitle} user={suggestions[currentViewedSuggestion].data} vote_user={true} user_func={voteUser} />}
                {winner && <UserProfile it_is_a_match={matched} main_title={t('HERE_IS_THE_WINNER')} sub_title={t('IF_FAVORITE_LIKES_YOU_WILL_BE_MATCH')} user={winner} vote_user={false} />}
            </div>
        </div>
    );
}
export default Suggestions;