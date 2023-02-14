import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {api_get_refused_users, api_restore_refused_user} from "../../../services/data_provider";
import UsersList from "../Common/UsersList";

const Refused = () => {
    const { t } = useTranslation();
    const [refused, setRefused] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [refusedFetched, setRefusedFetched] = useState(false);

    useEffect(() => {
        fetchRefusedUsers().catch(console.log);
    }, [currentPage]);

    const fetchRefusedUsers = async () => {
        try{
            const result = await api_get_refused_users(currentPage);
            if(result?.status === 200){
                result.data.user_list.forEach(el => {
                    el.restore_clicked = false;
                })
                console.log("result.data.user_list",result.data.user_list);
                setRefused(result.data.user_list);
                setNumberOfPages(result.data.nr_of_pages);
            }
            setRefusedFetched(true);
            console.log("result",result);
        }
        catch(exception){
            console.log('exception',exception);
            setRefusedFetched(true);
            throw exception;
        }
    }

    const confirmRestore = async (user) => {
        console.log('hej');
        try{
            const result = await api_restore_refused_user(user._id);
            if(result?.status === 200){
                window.location.reload();
            }
        }
        catch(exception){
            console.log('exception',exception);
            throw exception;
        }
    }

    const restore = (user, flag) => {
        setRefused(
            refused.map(item =>
                item._id === user._id
                    ? {...item, restore_clicked : flag}
                    : item
            ));
    }

    useEffect(() => {
        fetchRefusedUsers().catch(console.log);
        console.log("Refused");
    }, []);


    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <div className="col col-12 text-center">
                            <h6 className="title">
                                {t('REFUSED')}
                            </h6>
                        </div>
                    </div>
                    {refusedFetched && refused.length === 0 && <div className="text-center">{t('NO_REFUSED_YET')}</div>}
                    {
                        refusedFetched && refused.length > 0 &&
                        <UsersList
                            confirmRestore={confirmRestore}
                            users={refused}
                            numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            restore={restore}
                            confirmRestoreText={t('CONFIRM_REMOVE_FROM_DISLIKED')}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
export default Refused;