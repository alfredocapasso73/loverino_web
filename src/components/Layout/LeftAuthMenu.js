import React, {useEffect, useState, useContext} from "react";
import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';
import {api_unread_messages} from "../../services/data_provider";
import AppContext from "../AppContext";

const LeftAuthMenu = (props) => {
    const { t } = useTranslation();
    let interval_id;
    const [numberOfUnreadMessages, setNumberOfUnreadMessages] = useState(0);
    const globalContext = useContext(AppContext);
    const [fetchUnreadFailed, setFetchUnreadFailed] = useState(false);

    const fetchUnreadMessages = async () => {
        try{
            const result = await api_unread_messages();
            if(result?.status === 200){
                const nr_of_unread_messages = result.data.unread_messages;
                setNumberOfUnreadMessages(nr_of_unread_messages);
            }
        }
        catch(exception){
            setFetchUnreadFailed(true);
            console.log("exception",exception);
        }
    }

    useEffect(() => {
        if(globalContext?.loggedInUserDetails?.current_match && props.caller !== 'match' && !fetchUnreadFailed){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            interval_id = setInterval(function(){
                fetchUnreadMessages().catch(console.log);
            }, 2000);
            return () => clearInterval(interval_id);
        }
    }, []);

    return(
        <div className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-1 col-sm-12 col-12 auth_left_menu_visibility">
            <div className="ui-block">
                <div className="your-profile">
                    <div className="ui-block-title">
                        <Link to={t('URL_YOUR_SUGGESTIONS')} className="h6 title">
                            {t('LINK_SUGGESTION')}
                        </Link>
                    </div>
                    <div className="ui-block-title">
                        <Link to={t('URL_MATCH')} className="h6 title">
                            {t('LINK_MATCH')}
                        </Link>
                        {numberOfUnreadMessages !== 0 && <span className="items-round-little bg-primary">{numberOfUnreadMessages}</span>}
                    </div>
                    <div className="ui-block-title">
                        <Link to={`${t('URL_FAVORITES')}`} className="h6 title">
                            {t('LINK_FAVORITES')}
                        </Link>
                    </div>
                    <div className="ui-block-title">
                        <Link to={`${t('URL_REFUSED')}`} className="h6 title">
                            {t('LINK_REFUSED')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LeftAuthMenu;