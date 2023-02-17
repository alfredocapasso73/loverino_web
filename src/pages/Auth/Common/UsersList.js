import React, {useState} from "react";
import { useTranslation } from 'react-i18next';
import {API_URLS} from "../../../services/api";
import {get_age_from_birthday} from "../../../helpers/DataCommon";
import BrowseFullImage from "./BrowseFullImage";

const UsersList = (props) => {
    const { t } = useTranslation();
    const [showingImagePopup, setShowingImagePopup] = useState(false);
    const [currentImgUrl, setCurrentImgUrl] = useState('');
    const [currentUserClicked, setCurrentUserClicked] = useState();
    const [hasMultipleImages, setHasMultipleImages] = useState(false);
    const [currentImgPosition, setCurrentImgPosition] = useState(0);

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
        const img_url = `${API_URLS.USER_GET_IMAGE.url}/small-picture-${currentUserClicked.pictures[new_position]}`;
        setCurrentImgUrl(img_url);
    }

    const onImageClick = (usr) => {
        if(usr.pictures.length > 0){
            const img_url = `${API_URLS.USER_GET_IMAGE.url}/small-picture-${usr.pictures[0]}`;
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


    return(
        <div className="row">
            <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12" style={{position: 'relative'}}>
                {
                    currentUserClicked && showingImagePopup &&
                    <BrowseFullImage user={currentUserClicked} showingImagePopup={showingImagePopup} setShowingImagePopup={setShowingImagePopup} currentImgUrl={currentImgUrl} hasMultipleImages={hasMultipleImages} browseImages={browseImages}/>
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
                                        <div style={{width: '100%', position: 'relative'}} className="text-center">
                                            <div className={`img_with_trash ${usr.restore_clicked ? 'img_with_trash_opaque' : ''}`}>
                                                <img  onClick={e => onImageClick(usr)} src={`${API_URLS.USER_GET_IMAGE.url}/small-picture-${usr.pictures[0]}`} alt="" style={{width: '100%'}} className="user_profile_image"/>
                                            </div>
                                            {
                                                usr.restore_clicked &&
                                                <div className="container_confirm_remove_picture">
                                                    <div style={{paddingTop: '30%'}}>
                                                        <div onClick={e => props.confirmRestore(usr)} className="a_div pointer opaque_on_hover" style={{fontWeight: 'bolder'}}>{props.confirmRestoreText}</div>
                                                        <div className="a_div" style={{fontWeight: 'bolder'}}>{t('OR')}</div>
                                                        <div onClick={e => props.restore(usr, false)} className="a_div pointer opaque_on_hover" style={{fontWeight: 'bolder'}}>{t('CANCEL')}</div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {
                                                usr._id !== props?.currentMatch &&
                                                <button className="btn btn-bg-secondary" style={{width: '100%', background: '#edf2f6'}} onClick={e => props.restore(usr, true)}>
                                                    <i className="fa-solid fa-trash" style={{color: 'black'}}></i>
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