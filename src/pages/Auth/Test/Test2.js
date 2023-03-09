import React, {useState} from "react";
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";

const Test2 = () => {
    const [zooming, setZooming] = useState(false);

    const zoom = () => {
        if(zooming){
            setZooming(false);
        }
        else{
            setZooming(true);
        }
    }

    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <div className="col col-4 text-center">
                            <h6 className="title">
                                <button onClick={zoom}>
                                    {zooming && <span>Zoom out</span>}
                                    {!zooming && <span>Zoom in</span>}
                                </button>
                            </h6>
                        </div>
                    </div>
                    <div className="ui-block-content">
                        <div className="row" style={{width: '100% !important',backgroundColor: 'yellow'}}>
                            <div className={`col-${zooming ? '12' : '12'}`} style={{ transform: `translateX(-${0 * 100}%)`, objectFit: 'cover', flexGrow: '1', flexShrink: '0' }}>
                                <img
                                    style={{width: '100% !important', height: '100% !important'}}
                                    src="https://images.localoverino.se:8080/getImage/picture-1677695454709.png"
                                    alt="platshallare" />
                            </div>
                            {
                                1 > 2 && !zooming &&
                                <div className="col-3" style={{backgroundColor: 'green'}}>
                                    col
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Test2;