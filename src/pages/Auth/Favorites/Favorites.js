import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {api_get_favorite_users} from "../../../services/data_provider";

const Favorites = () => {
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState([]);
    const [favoritesFetched, setFavoritesFetched] = useState(false);


    const fetchFavoriteUsers = async () => {
        try{
            const result = await api_get_favorite_users();
            if(result?.status === 200 && result?.data?.favorite_list?.length){
                setFavorites(result.data.favorite_list);
            }
            setFavoritesFetched(true);
        }
        catch(exception){
            console.log('exception',exception);
            setFavoritesFetched(true);
            throw exception;
        }
    }

    useEffect(() => {
        fetchFavoriteUsers().catch(console.log);
        console.log("Favorites");
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
                    <div className="ui-block-content">
                        <div className="text-center">
                            {favoritesFetched && favorites.length === 0 && <span>{t('NO_FAVORITES_YET')}</span>}
                            {favoritesFetched && favorites.length > 0 && <span>{t('THESE_ARE_YOUR_FAVORITES')}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Favorites;