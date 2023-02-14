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
                        <svg className="close_image_svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#798686" d="M32 4.149l-3.973-3.979-11.936 11.941-11.941-11.941-3.979 3.979 11.941 11.936-11.941 11.936 3.979 3.979 11.941-11.936 11.936 11.936 3.973-3.979-11.936-11.936z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FullImage;