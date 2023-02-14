import React from "react";

const BrowseFullImage = (props) => {
    return(
        <div className="row">
            <div className="col col-12">
                <div className={`full_image_container ${props.showingImagePopup ? 'd-block' : 'd-none'}`} style={{backgroundPosition: 'center', width: '98%'}}>
                    <div className="ui-block">
                        <div style={{position: 'relative'}}>
                            {
                                props.currentImgUrl && <img alt="" loading="lazy" src={props.currentImgUrl}  style={{width: '100%'}}/>
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
                            <div className="full_image_close_container" onClick={e => props.setShowingImagePopup(false)}>
                                <svg className="close_image_svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#798686" d="M32 4.149l-3.973-3.979-11.936 11.941-11.941-11.941-3.979 3.979 11.941 11.936-11.941 11.936 3.979 3.979 11.941-11.936 11.936 11.936 3.973-3.979-11.936-11.936z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default BrowseFullImage;