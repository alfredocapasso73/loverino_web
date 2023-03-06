import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {
    api_restore_winner_user,
    api_get_winner_users,
    api_get_me
} from "../../../services/data_provider";
import UsersList from "../Common/UsersList";

const Winners = () => {
    const { t } = useTranslation();
    const [winners, setWinners] = useState([]);
    const [winnersFetched, setWinnersFetched] = useState(false);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentMatch, setCurrentMatch] = useState('');

    useEffect(() => {
        fetchWinnerUsers().catch(console.log);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchWinnerUsers = async () => {
        try{
            const result = await api_get_winner_users(currentPage);
            console.log('result',result);
            if(result?.status === 200 && result?.data?.user_list?.length){
                result.data.user_list.forEach(el => {
                    el.restore_clicked = false;
                })
                setWinners(result.data.user_list);
                setNumberOfPages(result.data.nr_of_pages);
            }
            setWinnersFetched(true);
        }
        catch(exception){
            console.log('exception',exception);
            setWinnersFetched(true);
            throw exception;
        }
    }

    const confirmRestore = async (user) => {
        try{
            const result = await api_restore_winner_user(user._id);
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
        console.log('restore');
        setWinners(
            winners.map(item =>
                item._id === user._id
                    ? {...item, restore_clicked : flag}
                    : item
            ));
    }

    const fetchMe = async () => {
        try{
            const result = await api_get_me();
            if(result?.status === 200 && result?.data?.user?.current_match){
                setCurrentMatch(result.data.user.current_match);
            }
        }
        catch(exception){
            console.log('exception',exception);
            throw exception;
        }
    }

    useEffect(() => {
        fetchMe().catch(console.log);
        fetchWinnerUsers().catch(console.log);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return(
        <div className="row">
            <LeftAuthMenu />
            <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <div className="col col-4 text-center">
                            <h6 className="title">
                                {t('WINNERS')}
                            </h6>
                        </div>
                    </div>
                    {winnersFetched && winners.length === 0 && <div className="text-center">{t('NO_WINNERS_YET')}</div>}
                    {
                        winnersFetched && winners.length > 0 &&
                        <UsersList
                            confirmRestore={confirmRestore}
                            restoreIcon="trash"
                            users={winners}
                            numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            restore={restore}
                            confirmRestoreText={t('CONFIRM_REMOVE_FROM_WINNERS_POPUP')}
                            currentMatch={currentMatch}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
export default Winners;