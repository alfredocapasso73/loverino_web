import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';

const UsersList = (props) => {
    const { t } = useTranslation();

    useEffect(() => {
        console.log("UsersList");
    }, []);

    const doVoid = () => {
        console.log("doVoid");
    }


    return(
        <div>
            <div className="row">
                <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                    {props.users && JSON.stringify(props.users)}
                </div>
            </div>
            <div className="row">
                <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                    {
                        props.numberOfPages > 0 &&
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                                <li className={`pointer page-item ${props.currentPage === 1 ? 'disabled' : ''}`} onClick={e => props.currentPage === 1 ? doVoid() : props.setCurrentPage(1)}>
                                    <span className="page-link">Previous</span>
                                </li>
                                {
                                    (props.currentPage-2) > 0 &&
                                    <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage-2))}>
                                        <span className="page-link">{(props.currentPage-2)}</span>
                                    </li>
                                }
                                {
                                    (props.currentPage-1) > 0 &&
                                    <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage-1))}>
                                        <span className="page-link">{(props.currentPage-1)}</span>
                                    </li>
                                }
                                <li className="page-item pointer disabled"><span className="page-link">{props.currentPage}</span></li>
                                {
                                    (props.currentPage+1) < props.numberOfPages &&
                                    <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage+1))}>
                                        <span className="page-link">{(props.currentPage+1)}</span>
                                    </li>
                                }
                                {
                                    (props.currentPage+2) < props.numberOfPages &&
                                    <li className="page-item pointer" onClick={e => props.setCurrentPage((props.currentPage+2))}>
                                        <span className="page-link">{(props.currentPage+2)}</span>
                                    </li>
                                }
                                <li className={`pointer page-item ${props.currentPage === props.numberOfPages ? 'disabled' : ''}`}  onClick={e => props.setCurrentPage((props.numberOfPages))}>
                                    <span className="page-link">Next</span>
                                </li>
                            </ul>
                        </nav>
                    }

                </div>
            </div>
        </div>

    );
}
export default UsersList;