export function global_error_handler(exception){
    if(exception?.message === 'jwt_expired'){
        window.localStorage.removeItem('token');
    }
}