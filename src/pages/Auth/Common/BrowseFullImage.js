import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import {get_age_from_birthday} from "../../../helpers/DataCommon";
import UserFullImages from "./UserFullImages";

const BrowseFullImage = (props) => {
    const { t } = useTranslation();
    const getAge = (birthday) => {
        return get_age_from_birthday(birthday);
    }

    const [showFullImages, setShowFullImages] = useState(false);
    const viewFullImage = () => {
        setShowFullImages(true);
    }
    const closeFullImage = () => {
        setShowFullImages(false);
    }


    return(
        <div className="ui-block-content">
            {
                showFullImages &&
                <UserFullImages user={props.user}  imageClose={closeFullImage}/>
            }
            {
                !showFullImages &&
                <div className="row">
                    <div className="col col-8">
                        <div className={`full_image_containers ${props.showingImagePopup ? 'd-block' : 'd-none'}`} style={{backgroundPosition: 'center', width: '98%'}}>
                            <div className="">
                                <div style={{position: 'relative'}}>
                                    {
                                        props.currentImgUrl && <img alt="" loading="lazy" className="pointer" src={props.currentImgUrl}  style={{width: '100%'}}  onClick={e => props.setShowingImagePopup(false)}/>
                                    }
                                    <i  onClick={e => props.setShowingImagePopup(false)} className={`fa-solid fa-close close_pic_inside_image_left`}></i>
                                    <i onClick={viewFullImage} className={`fa-solid fa-magnifying-glass zoom_pic_inside_image`}></i>
                                    {
                                        props.hasMultipleImages &&
                                        <div className="pic_navigator">
                                            <div className="pic_navigator_left">
                                                <img src="/img/icons8-chevron-left-32.png" alt="left" onClick={e => props.browseImages('b')}/>
                                            </div>
                                            <div className="pic_navigator_right">
                                                <img src="/img/icons8-chevron-right-32.png" alt="left" onClick={e => props.browseImages('f')} />
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-4">
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
                                {props.user.description}???
                            </p>
                        }
                    </div>
                </div>
            }

        </div>

    );
}
export default BrowseFullImage;