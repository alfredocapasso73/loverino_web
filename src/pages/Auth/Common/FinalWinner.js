import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from "../../../components/Layout/Carousel";
import Confetti from 'react-confetti';
import {Link} from "react-router-dom";

const FinalWinner = (props) => {
    const { t } = useTranslation();
    const carousel_base_url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/big-picture`;

    return (
        <div className="ui-block">
            {props.matched && <Confetti />}
            <div className="ui-block-title">
                {
                    !props.matched &&
                    <h6 className="title">
                        {t('HERE_IS_THE_WINNER')}
                    </h6>
                }
                {
                    props.matched &&
                    <h6 className="title">
                        {t('IT_WAS_A_MATCH')}
                    </h6>
                }
            </div>
            <div className="ui-block-title">
                {
                    !props.matched &&
                    <h6 className="title">
                        {t('IF_FAVORITE_LIKES_YOU_WILL_BE_MATCH')}
                    </h6>
                }
                {
                    props.matched &&
                    <div className="text-center" style={{marginTop: '10px'}}>
                        {t('CLICK')} <Link to={t('URL_MATCH')}>{t('HERE')}</Link> {t('TO_START_CHAT')}
                    </div>
                }
            </div>

            <div className="ui-block-content">
                <Carousel user={props.user} closeImage={undefined}>
                    {
                        props.user.pictures.map((pic, index) =>
                            <img key={index} className="carousel_img" src={`${carousel_base_url}-${pic}`} alt="placeholder" />
                        )
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default FinalWinner;