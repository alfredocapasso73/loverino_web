import React from "react";
import '../../assets/css/theme-font.min.css';
import '../../assets/Bootstrap/dist/css/bootstrap.css';
import '../../assets/css/main.css';

const PagePreloader = () => {
    return(
        <div id="hellopreloader">
            <div className="preloader">
                <svg width="45" height="45" stroke="#fff">
                    <g fill="none" fillRule="evenodd" strokeWidth="2" transform="translate(1 1)">
                        <circle cx="22" cy="22" r="6" stroke="none">
                            <animate attributeName="r" begin="1.5s" calcMode="linear" dur="3s" repeatCount="indefinite" values="6;22"/>
                            <animate attributeName="stroke-opacity" begin="1.5s" calcMode="linear" dur="3s" repeatCount="indefinite" values="1;0"/>
                            <animate attributeName="stroke-width" begin="1.5s" calcMode="linear" dur="3s" repeatCount="indefinite" values="2;0"/>
                        </circle>
                        <circle cx="22" cy="22" r="6" stroke="none">
                            <animate attributeName="r" begin="3s" calcMode="linear" dur="3s" repeatCount="indefinite" values="6;22"/>
                            <animate attributeName="stroke-opacity" begin="3s" calcMode="linear" dur="3s" repeatCount="indefinite" values="1;0"/>
                            <animate attributeName="stroke-width" begin="3s" calcMode="linear" dur="3s" repeatCount="indefinite" values="2;0"/>
                        </circle>
                        <circle cx="22" cy="22" r="8">
                            <animate attributeName="r" begin="0s" calcMode="linear" dur="1.5s" repeatCount="indefinite" values="6;1;2;3;4;5;6"/>
                        </circle>
                    </g>
                </svg>
                <div className="text">Loading ...</div>
            </div>
        </div>
    );
}
export default PagePreloader;