const API_BASE = "";
const URI_PREFIX = "api/v1";
const USER_PREFIX = `${API_BASE}/${URI_PREFIX}/user`;
const GEO_PREFIX = `${API_BASE}/${URI_PREFIX}/geo`;
const SUGGESTION_PREFIX = `${API_BASE}/${URI_PREFIX}/suggestion`;

export const geo_prefix = GEO_PREFIX;
export const user_prefix = USER_PREFIX;

export const API_URLS =
    {
        USER_ME: {url: `${USER_PREFIX}/me`, method: 'GET', auth: true}
        ,USER_SIGNUP: {url: `${USER_PREFIX}/signup`, method: 'POST', auth: false}
        ,USER_SIGNIN: {url: `${USER_PREFIX}/signin`, method: 'POST', auth: false}
        ,USER_ACTIVATE: {url: `${USER_PREFIX}/activate`, method: 'GET', auth: false}
        ,USER_GET_IMAGE: {url: `${USER_PREFIX}/getImage`, method: 'GET', auth: true}
        ,USER_DELETE_PICTURE: {url: `${USER_PREFIX}/deletePicture`, method: 'DELETE', auth: true}
        ,USER_RESEND_ACTIVATION_LINK: {url: `${USER_PREFIX}/resendActivationLink`, method: 'POST', auth: false}
        ,USER_FORGOT_PASSWORD: {url: `${USER_PREFIX}/forgotPassword`, method: 'POST', auth: false}
        ,USER_RESTORE_GET: {url: `${USER_PREFIX}/restore`, method: 'GET', auth: false}
        ,USER_RESTORE_PUT: {url: `${USER_PREFIX}/restore`, method: 'PUT', auth: false}
        ,USER_STEP_2: {url: `${USER_PREFIX}/step2`, method: 'POST', auth: true}
        ,USER_UPDATE_MY_PROFILE: {url: `${USER_PREFIX}/updateMyProfile`, method: 'POST', auth: true}
        ,USER_CHANGE_PASSWORD: {url: `${USER_PREFIX}/updatePassword`, method: 'PUT', auth: true}
        ,USER_CHANGE_EMAIL: {url: `${USER_PREFIX}/updateEmail`, method: 'PUT', auth: true}
        ,USER_UPDATE_NOTIFICATIONS: {url: `${USER_PREFIX}/updateNotifications`, method: 'PUT', auth: true}
        ,USER_CLOSE_ACCOUNT: {url: `${USER_PREFIX}/closeAccount`, method: 'DELETE', auth: true}
        ,USER_UPLOAD_PICTURE: {url: `${USER_PREFIX}/uploadPicture`, method: 'POST', auth: true}
        ,USER_GET_USER: {url: `${USER_PREFIX}/getUser`, method: 'GET', auth: true}
        ,USER_GET_MESSAGES: {url: `${USER_PREFIX}/getMessages`, method: 'POST', auth: true}
        ,USER_GET_MESSAGE_HISTORY: {url: `${USER_PREFIX}/getMessageHistory`, method: 'POST', auth: true}
        ,USER_CANCEL_CURRENT_MATCH: {url: `${USER_PREFIX}/cancelCurrentMatch`, method: 'PUT', auth: true}
        ,USER_REFRESH_TOKEN: {url: `${USER_PREFIX}/refreshToken`, method: 'POST', auth: false}
        ,GEO_GET_REGIONS: {url: `${GEO_PREFIX}/region`, method: 'GET', auth: false}
        ,GEO_GET_CITIES: {url: `${GEO_PREFIX}/city`, method: 'GET', auth: false}
        ,SUGGESTION_GET_MINE: {url: `${SUGGESTION_PREFIX}/suggestions`, method: 'GET', auth: true}
        ,SUGGESTION_SET_VOTE: {url: `${SUGGESTION_PREFIX}/vote`, method: 'POST', auth: true}
        ,SUGGESTION_GET_COMPETITION: {url: `${SUGGESTION_PREFIX}/competition`, method: 'GET', auth: true}
        ,SUGGESTION_POST_COMPETITION: {url: `${SUGGESTION_PREFIX}/competition`, method: 'POST', auth: true}
    };

const header = {
    method: "GET"
    ,headers: {
        "Content-Type": "application/json"
    }
};

export async function make_request(url_key, body = undefined){
    try{
        if(url_key.auth && !localStorage.getItem("token")){
            throw Object.assign(new Error('missing_token_for_auth_request'),{ code: 401 });
        }
        if(url_key.method === 'POST' && !body){
            throw Object.assign(new Error('missing_body_for_request'),{ code: 400 });
        }
        const url = url_key.url;
        header.method = url_key.method;
        if(url_key.auth){
            header.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        }
        if(url_key.method === 'POST' || url_key.method === 'PUT' || url_key.method === 'DELETE'){
            header.body = JSON.stringify(body);
        }
        else{
            delete header.body;
        }
        const response = await fetch(`${url}`, header);

        const data = await response.json();
        return {status: response.status, data: data};
    }
    catch(exception){
        console.log('exception:',exception)
        throw exception;
    }
}

export async function make_image_request(url_key, body = undefined){
    try{
        if(url_key.auth && !localStorage.getItem("token")){
            throw Object.assign(new Error('missing_token_for_auth_request'),{ code: 401 });
        }
        if(url_key.method === 'POST' && !body){
            throw Object.assign(new Error('missing_body_for_request'),{ code: 400 });
        }
        const url = url_key.url;
        header.method = url_key.method;
        if(url_key.auth){
            header.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        }
        if(url_key.method === 'POST' || url_key.method === 'PUT'){
            header.body = JSON.stringify(body);
        }
        else{
            delete header.body;
        }
        const response = await fetch(`${url}`, header);
        console.log("response",response);
        return response;
    }
    catch(exception){
        console.log('exception:',exception)
        throw exception;
    }
}