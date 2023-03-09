import React, {useState, useEffect, useRef} from 'react';
import '../../assets/css/carousel.css';
import { useTranslation } from 'react-i18next';
import {get_age_from_birthday} from "../../helpers/DataCommon";

const Carousel = (props) => {
    const { t } = useTranslation();
    const getAge = (birthday) => {
        return get_age_from_birthday(birthday);
    }
    const {children} = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);
    const [touchPosition, setTouchPosition] = useState(null);
    const [isZooming, setIsZooming] = useState(false);

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    useEffect(() => {
        setLength(children.length);
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1);
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1);
        }
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if(touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            next();
        }

        if (diff < -5) {
            prev();
        }

        setTouchPosition(null);
    }

    const zoomImage = () => {
        if(isZooming){
            setIsZooming(false);
        }
        else{
            setIsZooming(true);
        }
    }

    const closeImage = () => {
        props.closeImage(false);
    }

    const carousel_base_url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/big-picture`;

    return (
        <div className="row">
            {
                props.user_func &&
                <>
                    <div className={`col col-${isZooming ? '12' : '8'}`}>
                        <div className="row carousel_user_voting_container" style={{marginBottom: '10px'}}>
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
                        <div className="carousel_user_voting_container_mobile">
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
                    {
                        !isZooming &&
                        <div className="col col-4">
                            &nbsp;
                        </div>
                    }
                </>
            }

            <div className={`col col-${isZooming ? '12' : '8'}`} style={{transition: "width 0.1s"}}>
                <div className="carousel-container">
                    <div className="carousel-wrapper">
                        {
                            currentIndex > 0 &&
                            <button onClick={prev} className="left-arrow">
                                &lt;
                            </button>
                        }
                        {
                            props.closeImage !== undefined &&
                            <button className="close_button" onClick={closeImage}>
                                &#10006;
                            </button>
                        }


                        <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                            <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)`, width: 'inherit' }}>
                                {children.length > 0 && children}
                                {children.length === 0 && <img className="carousel_img" src="/img/big-picture-no-pic.png" alt="placeholder" />}
                            </div>
                        </div>
                        {
                            children.length > 0 &&
                            <button className="search_button" onClick={zoomImage}>
                                {!isZooming && <span>&#128269;</span>}
                                {isZooming && <span>&#128270;</span>}
                            </button>
                        }

                        {
                            currentIndex < (length - 1) &&
                            <button onClick={next} className="right-arrow">
                                &gt;
                            </button>
                        }
                    </div>
                </div>
            </div>
            {
                !isZooming && props?.user &&
                <div className={`col col-4`}>
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
            }
        </div>

    )
}

export default Carousel