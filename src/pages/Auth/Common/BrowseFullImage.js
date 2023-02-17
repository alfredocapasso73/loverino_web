import React from "react";
import { useTranslation } from 'react-i18next';
import {get_age_from_birthday} from "../../../helpers/DataCommon";

const BrowseFullImage = (props) => {
    const { t } = useTranslation();
    const getAge = (birthday) => {
        return get_age_from_birthday(birthday);
    }
    return(
        <div className="row">
            <div className="col col-8">
                <div className={`full_image_containers ${props.showingImagePopup ? 'd-block' : 'd-none'}`} style={{backgroundPosition: 'center', width: '98%'}}>
                    <div className="ui-block">
                        <div style={{position: 'relative'}}>
                            {
                                props.currentImgUrl && <img alt="" loading="lazy" className="pointer" src={props.currentImgUrl}  style={{width: '100%'}}  onClick={e => props.setShowingImagePopup(false)}/>
                            }
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

    );
}
export default BrowseFullImage;