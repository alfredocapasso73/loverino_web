import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';

const NoSuggestionLiked = (props) => {
    const { t } = useTranslation();
    //const minutes_left = props.minutes_left;
    const minutes_left = 1;
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(parseInt(minutes_left) % 60);
    const [hoursLeft, setHoursLeft] = useState(Math.floor(parseInt(minutes_left)/60));
    //let timer
    //const [count, setCount] = useState(parseInt(minutes_left)*60);

    useEffect(() => {
        if(1 > 2){
            setSecondsLeft(0);
            setMinutesLeft(0);
            setHoursLeft(0);
        }


        /*const updateCount = () => {
            timer = !timer && setInterval(() => {
                if(count % 60 === 0){
                    setSecondsLeft(prevSeconds => 59);
                    if(minutesLeft === 0){
                        setMinutesLeft(prevCount => 59);
                        setHoursLeft(prevCount => prevCount - 1);
                    }
                    else{
                        setMinutesLeft(prevCount => prevCount - 1);
                    }
                }
                else{
                    setSecondsLeft(prevCount => prevCount - 1)
                }
                setCount(prevCount => prevCount - 1)
            }, 1000)

            if (count === 0){
                console.log("over");
                clearInterval(timer)
            }
        }*/

        if(!props.none_at_all){
            console.log("!props.none_at_all");
            //updateCount();
            //return () => clearInterval(timer);
        }
    }, [props.none_at_all])



    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    {props.main_title}
                </h6>
            </div>
            {
                !props.none_at_all &&
                <div className="ui-block-content">
                    <h4 className="title text-center">
                        {t('NEW_SUGGESTION_WITHIN')}
                    </h4>
                </div>
            }
            {
                props.none_at_all &&
                <div className="ui-block-content">
                    <h4 className="title text-center">
                        {t('DONT_GIVE_UP_COME_BACK_LATER')}
                    </h4>
                </div>
            }

            {
                !props.none_at_all &&
                <div className="text-center">
                    <div style={{fontSize: '1.5rem'}}>
                        {hoursLeft < 9 && <span>0{hoursLeft}</span>}:
                        {minutesLeft <= 9 && <span>0{minutesLeft}:</span>}
                        {minutesLeft > 9 && <span>{minutesLeft}:</span>}
                        {secondsLeft <= 9 && <span>0{secondsLeft}</span>}
                        {secondsLeft > 9 && <span>{secondsLeft}</span>}
                    </div>
                </div>
            }

        </div>
    );
}
export default NoSuggestionLiked;