import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import {get_age_from_birthday} from "../../../helpers/DataCommon";
import {API_URLS} from "../../../services/api";
import Confetti from 'react-confetti';
import {Link} from "react-router-dom";

const UserProfile = (props) => {
    const { t } = useTranslation();
    const getAge = (birthday) => {
        return get_age_from_birthday(birthday);
    }

    useEffect(() => {
        setCurrentImage(props.user.pictures[0]);
    }, [props.user]);

    const [currentImage, setCurrentImage] = useState(props.user.pictures[0]);
    const [imagePosition, setImagePosition] = useState(0);

    const browseImages = (direction) => {
        if(direction === 'b'){
            const new_position = imagePosition === 0 ? (props.user.pictures.length-1) : imagePosition-1;
            setImagePosition(new_position);
            setCurrentImage(props.user.pictures[new_position]);
        }
        else{
            const new_position = imagePosition < (props.user.pictures.length-1) ? imagePosition+1 : 0;
            setImagePosition(new_position);
            setCurrentImage(props.user.pictures[new_position]);
        }
        console.log("direction",direction);
    }

    return(
        <div style={{position: 'relative'}}>
            <div className="ui-block">
                <div className="ui-block-title">
                    {
                        !props.it_is_a_match &&
                        <h6 className="title">
                            {props.main_title}
                        </h6>
                    }
                    {
                        props.it_is_a_match &&
                        <h6 className="title">
                            {t('IT_WAS_A_MATCH')}
                        </h6>
                    }

                </div>
                {
                    !props.it_is_a_match &&
                    <div className="ui-block-title">
                        {props.sub_title && <p>{props.sub_title}</p>}
                    </div>
                }

                {
                    props.it_is_a_match &&
                    <div className="ui-block-content">
                        {t('CLICK')} <Link to={t('URL_MATCH')}>{t('HERE')}</Link> {t('TO_START_CHAT')}
                    </div>
                }
                <div className="inner_container">
                    <div className="row">
                        {props.it_is_a_match && <Confetti />}
                        {
                            props?.user?.pictures?.length > 0 &&
                            <div className="col col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9">
                                <div className="voting_picture">
                                    {
                                        <img
                                            src={`${API_URLS.USER_GET_IMAGE.url}/small-picture-${currentImage}`}
                                            alt=""
                                            style={{width: '100%'}}
                                            className="user_profile_image"/>
                                    }
                                    {
                                        props.user.pictures?.length > 1 &&
                                        <div className="pic_navigator">
                                            <div className="pic_navigator_left">
                                                <img src="/img/icons8-chevron-left-32.png" alt="left" onClick={e => browseImages('b')}/>
                                            </div>
                                            <div className="pic_navigator_right">
                                                <img src="/img/icons8-chevron-right-32.png" alt="left" onClick={e => browseImages('f')} />
                                            </div>
                                        </div>
                                    }
                                    {
                                        props.vote_user &&
                                        <div>
                                            <div className="user_voting_container">
                                                <div className="row">
                                                    <div className="col col-4 text-center" onClick={e => props.user_func('n')}>
                                                        <svg className="svg_voting_symbol svg_voting_symbol_no" width="60px" height="60px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill="red" d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="col col-4 text-center" onClick={e => props.user_func('m')}>
                                                        <svg width="60px" height="60px" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg_voting_symbol svg_voting_symbol_maybe">
                                                            <path fill="blue" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="col col-4 text-center" onClick={e => props.user_func('y')}>
                                                        <svg width="60px" height="60px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg_voting_symbol svg_voting_symbol_yes" >
                                                            <path fill="green" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="user_voting_container_mobile">
                                                <div className="row">
                                                    <div className="col col-4 text-center" onClick={e => props.user_func('n')}>
                                                        <img alt="" src="/img/svg/icons8-close-25.png" style={{width: '30px', height: '30px'}} className="svg_voting_symbol"/>
                                                    </div>
                                                    <div className="col col-4 text-center" onClick={e => props.user_func('m')}>
                                                        <img alt="" src="/img/svg/question.png" style={{width: '30px', height: '30px'}} className="svg_voting_symbol"/>
                                                    </div>
                                                    <div className="col col-4 text-center" onClick={e => props.user_func('y')}>
                                                        <img alt="" src="/img/svg/icons8-green-heart-25.png" style={{width: '30px', height: '30px'}} className="svg_voting_symbol"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
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
                            <h6>
                                {props.user.height} {t('CM_TALL')}
                            </h6>
                            <h6>
                                {t(props.user.body_type)}
                            </h6>
                            {props.user.description &&
                                <p>
                                    {props.user.description}
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserProfile;