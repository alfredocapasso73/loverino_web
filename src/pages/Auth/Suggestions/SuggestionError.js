import React from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'

const SuggestionError = (props) => {
    const { t } = useTranslation();
    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    {t('SOMETHING_WENT_WRONG')}
                </h6>
            </div>
        </div>
    );
}
export default SuggestionError;