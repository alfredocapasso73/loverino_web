import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import '../../../assets/css/monogomic.css'
import LeftAuthMenu from "../../../components/Layout/LeftAuthMenu";
import {api_get_refused_users} from "../../../services/data_provider";
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
                        <div className="col col-4 text-center">
                            <h6 className="title">
                                {t('REFUSED')}
                            </h6>
                        </div>
                    </div>
                    <div className="ui-block-content">
                        <div className="text-center">
                            {refusedFetched && refused.length === 0 && <span>{t('NO_REFUSED_YET')}</span>}
                            {refusedFetched && refused.length > 0 && <span>{t('THESE_ARE_YOUR_REFUSED')}</span>}
                        </div>
                        {
                            refusedFetched && refused.length > 0 &&
                            <UsersList users={refused} numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Refused;