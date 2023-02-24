import React, {useEffect} from "react";
import PagePreloader from "./Layout/PagePreloader";
import {useParams} from "react-router-dom";

const ChangeLanguage = () => {
    let { name } = useParams();

    useEffect(() => {
        const white_list = ['en', 'se', 'it'];
        const new_lang = white_list.includes(name) ? name : 'se';
        localStorage.setItem("lang",new_lang);
        setTimeout(function(){
            window.location.href = '/';
        },100);
    }, [name]);

    return(
        <div className="landing-page">
            <PagePreloader />
            <div>
                Test
            </div>
        </div>
    );
}
export default ChangeLanguage;