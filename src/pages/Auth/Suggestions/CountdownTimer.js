import React, { useState, useEffect } from "react";
import NoSuggestionLiked from "./NoSuggestionLiked";

// const date = { dateNum: 199, dateType: 'min', dateInterval: 60000 } - prop for CountdownTimer

const CountdownTimer = ({ dateNum, dateType, dateInterval }) => {
    const [num, setNum] = useState(dateNum);

    useEffect(() => {
        const interval = setInterval(() => {
            if (num > 0) {
                setNum(num => num - 1);
            }
        }, dateInterval);
        return () => clearInterval(interval);
    }, [num, dateInterval]);

    const dateTypeFormatted = num === 1 ? `${dateType}` : `${dateType}s`;

    return (
        <div className="timerContainer">
            <span className="timerCount">{num}</span>
            <br />
            <span className="timerDateType">{dateTypeFormatted}</span>
        </div>
    );
};
export default CountdownTimer;