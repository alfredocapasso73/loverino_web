import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';

const NoSuggestionLiked = (props) => {
    const { t } = useTranslation();
    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');
    const [hours, setHours] = useState('00');
    const [nrOfLoops, setNrOfLoops] = useState((props.minutes_left+2)*60);
    let interval;

    const calculateHours = (mn_lft) => {
        const nr_of_hours = Math.floor(mn_lft/60);
        const hours = nr_of_hours > 9 ? nr_of_hours : `0${nr_of_hours}`;
        setHours(hours);
    }

    const calculateMinutes = (mn_lft) => {
        const nr_of_minutes = Math.floor(mn_lft%60);
        const minutes = nr_of_minutes > 9 ? nr_of_minutes : `0${nr_of_minutes}`;
        setMinutes(minutes);
    }

    useEffect(() => {
        if (nrOfLoops < 0) {
            clearInterval(interval);
            window.location.reload();
        }
        else{
            const mn_lft = nrOfLoops/60;
            if(nrOfLoops % 60 === 0){
                if(mn_lft > 59){
                    calculateHours(mn_lft);
                }
                calculateMinutes(mn_lft);
                setSeconds('00');
            }
            else{
                if(nrOfLoops % 60 === 59){
                    calculateMinutes(mn_lft);
                    if(mn_lft > 59){
                        calculateHours(mn_lft);
                    }
                }
                const nr_of_seconds = nrOfLoops%60;
                const secs = nr_of_seconds > 9 ? nr_of_seconds : `0${nr_of_seconds}`;
                setSeconds(secs);
            }
        }
    }, [nrOfLoops]);

    useEffect(() => {
        interval = setInterval(() => {
            setNrOfLoops((time) => time - 1);
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, []);



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
                        {hours}:
                        {minutes}:
                        {seconds}
                    </div>
                </div>
            }
        </div>
    );
}
export default NoSuggestionLiked;