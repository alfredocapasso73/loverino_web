import React from "react";

const FullImage = (props) => {

    return(
        <div className={`full_image_container ${props.showingImagePopup ? 'd-block' : 'd-none'}`}>
            <div className="ui-block text-center" style={{padding: '15px'}}>
                <div style={{position: 'relative'}}>
                    {
                        props.currentImgUrl && <img className="pointer" onClick={props.imageClose} alt="" loading="lazy" src={props.currentImgUrl}  style={{width: 'fit-content', display: 'block', textAlign: 'center', marginRight: 'auto', marginLeft: 'auto'}}/>
                    }
                    <div className="full_image_close_container" style={{display: 'none'}}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FullImage;