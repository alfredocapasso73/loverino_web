import React from "react";
import { useTranslation } from 'react-i18next';

const FormTitle = (props) => {
    const { t } = useTranslation();

    return(
        <div className="title h6">
            {t(props.title)}
        </div>
    );
}
export default FormTitle;