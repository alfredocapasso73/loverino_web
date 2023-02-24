import React, {useEffect} from "react";
import PagePreloader from "./Layout/PagePreloader";
import {useNavigate, useParams} from "react-router-dom";

const ChangeLanguage = () => {
    let { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const white_list = ['en', 'se', 'it'];
        const new_lang = white_list.includes(name) ? name : 'se';
        localStorage.setItem("lang",new_lang)
        navigate('/');
    }, []);

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