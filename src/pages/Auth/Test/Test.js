import React from "react";
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import Carousel from "../../../components/Layout/Carousel";


const Test = () => {

    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <div className="col col-4 text-center">
                            <h6 className="title">
                                TEST
                            </h6>
                        </div>
                    </div>
                    <div className="ui-block-content">
                        <div className="row">
                            <div className="col-9" style={{backgroundColor: 'red'}}>
                                col
                            </div>
                            <div className="col-3" style={{backgroundColor: 'green'}}>
                                col
                            </div>
                        </div>
                        <Carousel>
                            <img className="carousel_img" src="https://images.localoverino.se:8080/getImage/big-picture-1677695454709.png" alt="placeholder" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Test;