import React from "react";
import { useTranslation } from 'react-i18next';
import {get_age_from_birthday} from "../../../helpers/DataCommon";


const TestUserProfile = (props) => {
    const { t } = useTranslation();
    const getAge = (birthday) => {
        return get_age_from_birthday(birthday);
    }

    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    {props.main_title}?
                </h6>
            </div>
            <div className="ui-block-title">
                {props.sub_title && <p>{props.sub_title}</p>}
            </div>
            <div className="ui-block-content">
                <div className="row">
                    <div className="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9">
                        hej
                    </div>
                    <div className="col col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                        <h3>
                            <b>{props.user.name}</b>
                        </h3>
                        <h6>
                            {getAge(props.user.birthday)} {t('YEARS_OLD')}
                        </h6>
                        <h6>
                            {props.user.city_name}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TestUserProfile;