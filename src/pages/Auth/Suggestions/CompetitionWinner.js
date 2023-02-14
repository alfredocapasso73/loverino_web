import React from "react";
import { useTranslation } from 'react-i18next';

const CompetitionWinner = (props) => {
    const { t } = useTranslation();
    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    The winner is
                </h6>
            </div>
            <div className="ui-block-content">
                <h4 className="title text-center">
                    Here is the winner
                </h4>
            </div>
        </div>
    );
}
export default CompetitionWinner;