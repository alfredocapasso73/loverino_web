import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from 'react-i18next';
import {image_service_delete_image, api_get_me, image_upload_picture} from "../../../services/data_provider";
import FullImage from "../Common/FullImage";

const CommonMyPictures = (props) => {
    const { t } = useTranslation();
    const uploadRef = useRef(null);
    const [fileUploadFailed, setFileUploadFailed] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [imageDeletedSuccess, setImageDeletedSuccess] = useState(false);
    const [imageDeletedFailure, setImageDeletedFailure] = useState(false);
    const [showingImagePopup, setShowingImagePopup] = useState(false);
    const [currentImgUrl, setCurrentImgUrl] = useState('');
    const [currentPictureToRemove, setCurrentPictureToRemove] = useState('');
    const [showingRemovePicture, setShowingRemovePicture] = useState(false);

    const imageClose = () => {
        setShowingImagePopup(false);
    }

    const onImageClick = (url) => {
        if(!showingRemovePicture){
            console.log('url:',url);
            const rewritten = url.replace('small-', 'big-');
            console.log('rewritten:',rewritten);
            setCurrentImgUrl(rewritten);
            setShowingImagePopup(true);
        }
    }

    const doneStep3 = async () => {
        window.location.href = t('URL_YOUR_SUGGESTIONS');
    }

    const removePicture = async (id) => {
        setShowingRemovePicture(true);
        const imgs = images;
        imgs.find(el => el.id === id).confirm_delete = 'y';
        setImages([...imgs]);
        setCurrentPictureToRemove(id);
    }

    const getImages = async () => {
        try{
            const response = await api_get_me();
            const pictures = response?.data?.user?.pictures;
            //const base_path_image = `${API_URLS.USER_GET_IMAGE.url}/small-picture-`;
            const base_path_image = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/getImage/small-picture-`;
            if(pictures && pictures.length){
                const all_images = [];
                pictures.forEach(el => {
                    const img = `${base_path_image}${el}`;
                    all_images.push({id: el, url: img, confirm_delete: 'n'});
                });
                setImages(all_images);
            }
            else{
                setImages([]);
            }
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const fileChanged = async (files) => {
        if(!files.length){
            console.log("nothing to upload");
            return;
        }
        setIsUploading(true);
        try{
            for await(const picture of files){
                await image_upload_picture(picture);
            }
            const response = await api_get_me();

            const pictures = response?.data?.user?.pictures;
            if(!pictures){
                setFileUploadFailed(true);
                setIsUploading(false);
            }
            else{
                console.log("pictures",pictures);
                setIsUploading(false);
                await getImages();
            }
        }
        catch(exception){
            console.log("exception",exception);
            setFileUploadFailed(true);
            setIsUploading(false);
        }
    }

    const confirmRemovePicture = async () => {
        try{
            const response = await image_service_delete_image(currentPictureToRemove);
            if(response.status === 200){
                setImageDeletedSuccess(true);
            }
            else{
                setImageDeletedFailure(true);
            }
            await getImages();
            setShowingRemovePicture(false);
            /*setTimeout(function(){
                window.location.reload()
            }, 2000);*/
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const cancelRemovePicture = () => {
        const pics = images;
        pics.find(el => el.id === currentPictureToRemove).confirm_delete = 'n';
        setImages([...pics]);
        setCurrentPictureToRemove('');
        setShowingRemovePicture(false);
    }

    const uploadFile = (e) => {
        e.stopPropagation();
        uploadRef.current.click();
    }

    useEffect(() => {
        getImages().catch(console.error);
    }, []);

    return(
        <div className="row">
            <div className="col col-xl-12 col-lg-12 order-lg-1 col-md-9 col-sm-6 col-12" style={{position: 'relative'}}>
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title">{t(props.title)}</h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="row">
                            {
                                images && images.map((img, index) =>
                                    <div key={index} className="col col-3">
                                        <div style={{width: '100%', position: 'relative'}} className="text-center">
                                            <div className="img_with_trash"  onClick={e => onImageClick(img.url)}>
                                                <img src={img.url} alt="" className="user_profile_image" />
                                                {
                                                    img.confirm_delete === 'y' &&
                                                    <div className="container_confirm_remove_picture">
                                                        <div style={{paddingTop: '30%'}}>
                                                            <div onClick={confirmRemovePicture} className="a_div pointer" style={{fontWeight: 'bolder'}}>{t('CONFIRM_REMOVE')}</div>
                                                            <div className="a_div" style={{fontWeight: 'plain'}}>{t('OR')}</div>
                                                            <div onClick={cancelRemovePicture} className="a_div pointer" style={{fontWeight: 'bolder'}}>{t('CANCEL')}</div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div style={{paddingBottom: '20px'}}>
                                                {
                                                    img.confirm_delete !== 'y' &&
                                                    <button className="btn btn-bg-secondary" style={{width: '100%', background: '#edf2f6'}} onClick={e => removePicture(img.id)}>
                                                        <i className="fa fa-trash" aria-hidden="true" style={{color: 'black'}}></i>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row">
                            <div className="col col-lg-12 col-md-12  col-sm-12 text-center">
                                {
                                    !isUploading && !showingImagePopup &&
                                    <div>
                                        <input
                                            accept="image/png, image/jpeg, image/gif"
                                            multiple
                                            ref={uploadRef}
                                            className="d-none"
                                            type="file"
                                            onChange={e => fileChanged(e.target.files)}
                                        />
                                        <div onClick={uploadFile} className="upload-photo-item">
                                            <svg className="olymp-computer-icon" viewBox="0 0 36 32">
                                                <g>
                                                    <path d="M32 22.4h-28.8v-19.2h32c0-1.766-1.434-3.2-3.2-3.2h-28.8c-1.766 0-3.2 1.432-3.2 3.2v19.2c0 1.766 1.434 3.202 3.2 3.202h9.6v3.198h-4.8v3.2h19.2v-3.2h-4.8v-3.198h9.6c1.766 0 3.2-1.434 3.2-3.202v-9.598h-3.2v9.598zM19.2 28.8h-3.2v-3.198h3.2v3.198zM32 9.6h3.2v-3.198h-3.2v3.198zM12.8 14.402v-3.2h-3.2v3.2h3.2zM19.2 14.402v-3.2h-3.2v3.2h3.2zM25.6 14.402v-3.2h-3.2v3.2h3.2z"/>
                                                </g>
                                            </svg>
                                            <h6>{t('UPLOAD_PICTURES')}</h6>
                                            <span>{t('UPLOAD_PICTURES_OF_YOURSELF')}</span>
                                            {
                                                fileUploadFailed &&
                                                <div className="alert alert-danger">
                                                    {t('FILE_UPLOAD_FAILURE')}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                                {
                                    isUploading &&
                                    <div>
                                        <div className="spinner-border text-center" role="status" style={{marginRight: 'auto', marginLeft: 'auto'}}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                }
                                {
                                    imageDeletedSuccess &&
                                    <div className="alert alert-success">
                                        {t('IMAGE_HAS_BEEN_DELETED')}
                                    </div>
                                }
                                {
                                    imageDeletedFailure &&
                                    <div className="alert alert-danger">
                                        {t('IMAGE_HAS_NOT_BEEN_DELETED')}
                                    </div>
                                }
                                {
                                    images && props.caller === 'step3' &&
                                    <div className="row" style={{paddingTop: '60px'}}>
                                        <div className="col">
                                            <button className={`btn btn-primary`}onClick={doneStep3}>
                                                {t('IM_DONE_STEP_3')}
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <FullImage showingImagePopup={showingImagePopup} currentImgUrl={currentImgUrl} imageClose={imageClose}/>
            </div>
        </div>
    );
}
export default CommonMyPictures;