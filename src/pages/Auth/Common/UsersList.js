import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import {get_age_from_birthday} from "../../../helpers/DataCommon";
import BrowseFullImage from "./BrowseFullImage";
import Popup from "../../../components/Layout/Popup";
import Carousel from "../../../components/Layout/Carousel";

const UsersList = (props) => {
    const { t } = useTranslation();
    const [showingImagePopup, setShowingImagePopup] = useState(false);
    const [currentImgUrl, setCurrentImgUrl] = useState('');
    const [currentUserClicked, setCurrentUserClicked] = useState();
    const [hasMultipleImages, setHasMultipleImages] = useState(false);
    const [currentImgPosition, setCurrentImgPosition] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [currentUserToRestore, setCurrentUserToRestore] = useState(undefined);

    const browseImages = (direction) => {
        let new_position;
        if(direction === 'b'){
            if(currentImgPosition === 0){
                new_position = currentUserClicked?.pictures?.length-1;
                setCurrentImgPosition(new_position);
            }
            else{
                new_position = currentImgPosition-1;
                setCurrentImgPosition(new_position);
            }
        }
        else{
            if(currentImgPosition === currentUserClicked?.pictures?.length-1){
                new_position = 0;
                setCurrentImgPosition(new_position);
            }
            else{
                new_position = currentImgPosition+1;
                setCurrentImgPosition(new_position);
            }
        }
        const img_url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/small-picture-${currentUserClicked.pictures[new_position]}`;
        setCurrentImgUrl(img_url);
    }

    const onImageClick = (usr) => {
        if(usr.pictures.length > 0){
            const img_url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/small-picture-${usr.pictures[0]}`;
            setCurrentImgPosition(0);
            if(usr.pictures.length > 1){
                setHasMultipleImages(true);
            }
            else{
                setHasMultipleImages(false);
            }
            setCurrentUserClicked(usr);
            setCurrentImgUrl(img_url);
            setShowingImagePopup(true);
        }
    }

    const doVoid = () => {
        console.log("doVoid");
    }

    const getAge = (birthday) => {
        return get_age_from_birthday(birthday);
    }

    const callRestore = (usr) => {
        setShowPopup(true);
        setCurrentUserToRestore(usr);
        props.restore(usr, true);
    }

    const callConfirmRestore = () => {
        props.confirmRestore(currentUserToRestore)
        setCurrentUserToRestore(undefined);
        setShowPopup(false);
    }

    const callCancelRestore = () => {
        props.restore(currentUserToRestore, false);
        setCurrentUserToRestore(undefined);
        setShowPopup(false);
    }

    const carousel_base_url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/big-picture`;


    return(
        <div className="row">
            {
                showPopup &&
                <Popup
                    onCancel={callCancelRestore}
                    onConfirm={callConfirmRestore}
                    title={props.confirmRestoreText}
                    confirmText={t('YES')}
                    cancelText={t('NO')}
                />
            }
            <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{position: 'relative'}}>
                {
                    currentUserClicked && showingImagePopup &&
                    <div className="ui-block-content">
                        <Carousel user={currentUserClicked} closeImage={setShowingImagePopup}>
                            {
                                currentUserClicked.pictures.map((pic, index) =>
                                    <img key={index} className="carousel_img" src={`${carousel_base_url}-${pic}`} alt="placeholder" />
                                )
                            }
                        </Carousel>
                    </div>
                }

                <div className={`ui-block-content ${showingImagePopup ? 'd-none' : 'd-block'}`} style={{position: 'relative'}}>
                    <div className={`row`}>

                        {
                            props.users.map((usr, index) =>
                                <div key={index} className={`col col-3`}>
                                    <div className="text-center">
                                        <h5 className="title" style={{marginBottom: '3px'}}>
                                            {usr.name}
                                        </h5>
                                        <div>
                                            {getAge(usr.birthday)} {t('YEARS_OLD')}
                                            <br />
                                            {usr.city_name}
                                        </div>
                                        <div style={{width: '100%', position: 'relative', paddingTop: '10px'}} className="text-center">
                                            <img
                                                onClick={e => onImageClick(usr)}
                                                src={`${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/small-picture-${usr.pictures[0]}`}
                                                alt="" style={{width: '100%'}}
                                                className="user_profile_image"
                                            />
                                        </div>
                                        <div>
                                            {
                                                usr._id !== props?.currentMatch &&
                                                <button className="btn btn-bg-secondary" style={{width: '100%', background: '#edf2f6'}} onClick={e => callRestore(usr)}>
                                                    <i className={`fa-solid fa-${props.restoreIcon}`} style={{color: 'black'}}></i>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                            {
                                props.numberOfPages > 0 &&
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${props.currentPage === 1 ? 'disabled' : 'pointer'}`} onClick={e => props.currentPage === 1 ? doVoid() : props.setCurrentPage(1)}>
                                            <span className="page-link">First</span>
                                        </li>
                                        {
                                            (props.currentPage-2) > 0 &&
                                            <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage-2))}>
                                                <span className="page-link">{(props.currentPage-2)}</span>
                                            </li>
                                        }
                                        {
                                            (props.currentPage-1) > 0 &&
                                            <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage-1))}>
                                                <span className="page-link">{(props.currentPage-1)}</span>
                                            </li>
                                        }
                                        <li className="page-item disabled">
                                            <span className="page-link" style={{opacity: '0.5'}}>
                                                {props.currentPage}
                                            </span>
                                        </li>
                                        {
                                            (parseInt(props.currentPage)+1) <= props.numberOfPages &&
                                            <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage+1))}>
                                                <span className="page-link">{(props.currentPage+1)}</span>
                                            </li>
                                        }
                                        {
                                            (props.currentPage+2) <= props.numberOfPages &&
                                            <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage+2))}>
                                                <span className="page-link">{(props.currentPage+2)}</span>
                                            </li>
                                        }
                                        <li className={`page-item ${props.currentPage === props.numberOfPages ? 'disabled' : 'pointer'}`}  onClick={e => props.setCurrentPage((props.numberOfPages))}>
                                            <span className="page-link">Last</span>
                                        </li>
                                    </ul>
                                </nav>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}
export default UsersList;