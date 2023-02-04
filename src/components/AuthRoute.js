import { Navigate, useOutlet } from "react-router-dom";

const AuthRoute = () => {
    const outlet = useOutlet();
    if(!window.localStorage.getItem('token')){
        return <Navigate to="/"/>
    }
    return (
        <div style={{backgroundColor: 'red'}}>
            {outlet}
        </div>
    )

}
export default AuthRoute;