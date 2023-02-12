import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';

const UsersList = (props) => {
    const { t } = useTranslation();

    useEffect(() => {
        console.log("UsersList");
    }, []);


    return(
        <div>
            <div className="row">
                <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                    {props.users && JSON.stringify(props.users)}
                </div>
            </div>
            <div className="row">
                <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            {
                                props.numberOfPages > 0 && props.currentPage > 1
                            }
                            <li className="page-item disabled">
                                <span className="page-link" href="#" tabIndex="-1">Previous</span>
                            </li>
                            <li className="page-item pointer">
                                <span className="page-link" href="#">
                                    1
                                </span>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">...</a></li>
                            <li className="page-item"><a className="page-link" href="#">12</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    );
}
export default UsersList;