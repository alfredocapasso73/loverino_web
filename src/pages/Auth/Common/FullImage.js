import React from "react";

const FullImage = (props) => {

    return(
        <div className={`full_image_container ${props.showingImagePopup ? 'd-block' : 'd-none'}`}>
            <div className="ui-block" style={{padding: '15px'}}>
                <div style={{position: 'relative'}}>
                    {
                        props.currentImgUrl && <img alt="" loading="lazy" src={props.currentImgUrl}  style={{width: '100%'}}/>
                    }
                    <div className="full_image_close_container" onClick={props.imageClose}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FullImage;