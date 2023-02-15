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
                                <i className="fa-solid fa-circle-xmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default BrowseFullImage;