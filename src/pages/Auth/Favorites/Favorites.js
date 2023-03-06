import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {
    api_get_favorite_users,
    api_restore_favorite_user,
    api_get_me
} from "../../../services/data_provider";
import UsersList from "../Common/UsersList";

const Favorites = () => {
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState([]);
    const [favoritesFetched, setFavoritesFetched] = useState(false);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentMatch, setCurrentMatch] = useState('');

    useEffect(() => {
        fetchFavoriteUsers().catch(console.log);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const fetchFavoriteUsers = async () => {
        try{
            const result = await api_get_favorite_users(currentPage);
            if(result?.status === 200 && result?.data?.user_list?.length){
                result.data.user_list.forEach(el => {
                    el.restore_clicked = false;
                })
                setFavorites(result.data.user_list);
                setNumberOfPages(result.data.nr_of_pages);
            }
            setFavoritesFetched(true);
        }
        catch(exception){
            console.log('exception',exception);
            setFavoritesFetched(true);
            throw exception;
        }
    }

    const confirmRestore = async (user) => {
        try{
            const result = await api_restore_favorite_user(user._id);
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
        setFavorites(
            favorites.map(item =>
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
        fetchFavoriteUsers().catch(console.log);
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
                                {t('FAVORITES')}
                            </h6>
                        </div>
                    </div>
                    {favoritesFetched && favorites.length === 0 && <div className="text-center">{t('NO_FAVORITES_YET')}</div>}
                    {
                        favoritesFetched && favorites.length > 0 &&
                        <UsersList
                            confirmRestore={confirmRestore}
                            restoreIcon="trash"
                            users={favorites}
                            numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            restore={restore}
                            confirmRestoreText={t('CONFIRM_REMOVE_FROM_FAVORITES_POPUP')}
                            currentMatch={currentMatch}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
export default Favorites;