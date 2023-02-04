import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';

const NoSuggestionLiked = (props) => {
    const { t } = useTranslation();
    //const minutes_left = props.minutes_left;
    const minutes_left = 1;
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(parseInt(minutes_left) % 60);
    const [hoursLeft, setHoursLeft] = useState(Math.floor(parseInt(minutes_left)/60));
    let timer
    const [count, setCount] = useState(parseInt(minutes_left)*60);
    const updateCount = () => {
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
    }

    useEffect(() => {
        updateCount()
        return () => clearInterval(timer)
    }, [count])



    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    {props.main_title}
                </h6>
            </div>
            <div className="ui-block-content">
                <h4 className="title text-center">
                    {t('NEW_SUGGESTION_WITHIN')}
                </h4>
            </div>
            <div className="text-center">
                <div style={{fontSize: '1.5rem'}}>
                    {hoursLeft < 9 && <span>0{hoursLeft}</span>}:
                    {minutesLeft <= 9 && <span>0{minutesLeft}:</span>}
                    {minutesLeft > 9 && <span>{minutesLeft}:</span>}
                    {secondsLeft <= 9 && <span>0{secondsLeft}</span>}
                    {secondsLeft > 9 && <span>{secondsLeft}</span>}
                </div>
            </div>
        </div>
    );
}
export default NoSuggestionLiked;