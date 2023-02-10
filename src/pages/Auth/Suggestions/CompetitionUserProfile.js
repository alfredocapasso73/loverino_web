import React from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import {get_age_from_birthday} from "../../../helpers/DataCommon";
import {API_URLS} from "../../../services/api";
const getAge = (birthday) => {
    return get_age_from_birthday(birthday);
}

const CompetitionUserProfile = (props) => {
    const { t } = useTranslation();

    const imageClicked = () => {
        props.om_image_clicked(props.user);
        console.log("imageClicked");
    }

    return(
        <div className="text-center">
            <div>
                <h5 className="title">
                    {props.user.name}
                </h5>
                <p>
                    {getAge(props.user.birthday)} {t('YEARS_OLD')}
                    <br />
                    {props.user.city_name.name}
                </p>
                <div style={{position: 'relative', width: '90%'}}>
                    <img src={`${API_URLS.USER_GET_IMAGE.url}/small-picture-${props.user.pictures[0]}`} alt="" style={{width: '100%'}} onClick={imageClicked} className="user_profile_image"/>
                    <div>
                        <div className="competition_heart only_desktop" onClick={e => props.user_func(props.user._id)}>
                            <svg width="60px" height="60px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg_voting_symbol svg_voting_symbol_yes" >
                                <path fill="green" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                            </svg>
                        </div>
                        <div className="only_mobile competition_heart_mobile"  onClick={e => props.user_func(props.user._id)}>
                            <img alt="" src="/img/svg/icons8-green-heart-25.png" style={{width: '30px', height: '30px'}} className="svg_voting_symbol"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default CompetitionUserProfile;