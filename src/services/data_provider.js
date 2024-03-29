import {make_request, API_URLS, geo_prefix, user_prefix} from './api';


export async function api_validate_token(token){
    const result = {success: false};
    try{
        const valid_token_request = await make_request(API_URLS.USER_ME);
        if(valid_token_request.status === 200){
            result.success = true;
            result.data = valid_token_request.data;
        }
        else{
            localStorage.removeItem("token");
        }
        return result;
    }
    catch(exception){
        console.log('exception:',exception);
        return result;
    }
}

export async function api_put_restore_password(password, user_id, restore_string){
    try{
        const body = {
            password: password
            ,restorePasswordString: restore_string
            ,userId: user_id
        }
        const request = await make_request(API_URLS.USER_RESTORE_PUT, body);
        return request;
    }
    catch(exception){
        console.log('exception:',exception);
        throw exception;
    }
}

export async function api_activate_account(user_id, activation_string){
    API_URLS.USER_ACTIVATE.url = `${API_URLS.USER_ACTIVATE.url}/${user_id}/${activation_string}`;
    try{
        const activation_request = await make_request(API_URLS.USER_ACTIVATE);
        return activation_request;
    }
    catch(exception){
        console.log('exception:',exception);
        throw exception;
    }
}


export async function api_resend_activation_link(body){
    try{
        const request = await make_request(API_URLS.USER_RESEND_ACTIVATION_LINK, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_refresh_token(body){
    try{
        const request = await make_request(API_URLS.USER_REFRESH_TOKEN, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_login(body){
    try{
        const request = await make_request(API_URLS.USER_SIGNIN, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_signup(body){
    try{
        const request = await make_request(API_URLS.USER_SIGNUP, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_unread_messages(){
    try{
        const request = await make_request(API_URLS.USER_UNREAD_MESSAGES, {});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_read_messages(){
    try{
        const request = await make_request(API_URLS.USER_READ_MESSAGES, {});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_message_history(last_created_at){
    try{
        const body = {last_created_at: last_created_at};
        const request = await make_request(API_URLS.USER_GET_MESSAGE_HISTORY, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_messages(){
    try{
        const body = {};
        const request = await make_request(API_URLS.USER_GET_MESSAGES, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_cancel_match(){
    try{
        const request = await make_request(API_URLS.USER_CANCEL_CURRENT_MATCH, {});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_user(user_id){
    try{
        const new_url = `${user_prefix}/getUser/${user_id}`;
        API_URLS.USER_GET_USER.url = new_url;
        const request = await make_request(API_URLS.USER_GET_USER);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_post_competition(body){
    try{
        const request = await make_request(API_URLS.SUGGESTION_POST_COMPETITION, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_competition(){
    try{
        const request = await make_request(API_URLS.SUGGESTION_GET_COMPETITION);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_post_vote(body){
    try{
        const request = await make_request(API_URLS.SUGGESTION_SET_VOTE, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_winners(){
    try{
        const request = await make_request(API_URLS.SUGGESTION_GET_WINNERS);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_suggestions(){
    try{
        const request = await make_request(API_URLS.SUGGESTION_GET_MINE);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_close_account(){
    try{
        const request = await make_request(API_URLS.USER_CLOSE_ACCOUNT);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_update_notifications(body){
    try{
        const request = await make_request(API_URLS.USER_UPDATE_NOTIFICATIONS, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_update_email(body){
    try{
        const request = await make_request(API_URLS.USER_CHANGE_EMAIL, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_update_password(body){
    try{
        const request = await make_request(API_URLS.USER_CHANGE_PASSWORD, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_update_my_profile(body){
    try{
        const request = await make_request(API_URLS.USER_UPDATE_MY_PROFILE, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_step_2(body){
    try{
        const request = await make_request(API_URLS.USER_STEP_2, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_forgot_password(body){
    try{
        const request = await make_request(API_URLS.USER_FORGOT_PASSWORD, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_restore_password(user_id, restore_string){
    try{
        API_URLS.USER_RESTORE_GET.url = `${API_URLS.USER_RESTORE_GET.url}/${user_id}/${restore_string}`;
        const request = await make_request(API_URLS.USER_RESTORE_GET);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_me(){
    try{
        const request = await make_request(API_URLS.USER_ME);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_winner_users(current_page){
    try{
        const request = await make_request(API_URLS.USER_GET_WINNER_USERS, {current_page: current_page});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_refused_users(current_page){
    try{
        const request = await make_request(API_URLS.USER_GET_REFUSED_USERS, {current_page: current_page});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_restore_winner_user(restore_id){
    try{
        const request = await make_request(API_URLS.USER_RESTORE_WINNER_USER, {restore_id: restore_id});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_restore_refused_user(restore_id){
    try{
        const request = await make_request(API_URLS.USER_RESTORE_REFUSED_USER, {restore_id: restore_id});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_restore_favorite_user(restore_id){
    try{
        const request = await make_request(API_URLS.USER_RESTORE_FAVORITE_USER, {restore_id: restore_id});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_favorite_users(current_page){
    try{
        const request = await make_request(API_URLS.USER_GET_FAVORITE_USERS, {current_page: current_page});
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_regions(){
    try{
        const request = await make_request(API_URLS.GEO_GET_REGIONS);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function api_get_cities(region_id){
    try{
        const new_url = `${geo_prefix}/city/${region_id}`;
        API_URLS.GEO_GET_CITIES.url = new_url;
        const request = await make_request(API_URLS.GEO_GET_CITIES);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function image_service_delete_image(picture_id){
    try{
        const body = {picture_id: picture_id};
        const header = {
            method: "DELETE"
            ,headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        const url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/deletePicture`;
        const response = await fetch(`${url}`, header);
        const data = await response.json();
        return {status: response.status, data: data};
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}

export async function image_upload_picture(file){
    try{
        const formData = new FormData();
        formData.append('picture', file);
        const header = {
            method: "POST"
            ,headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        };
        const url = `${process.env.REACT_APP_IMAGE_SERVER_BASE}/uploadPicture`;
        const response = await fetch(`${url}`, header);
        const data = await response.json();
        return {status: response.status, data: data};
    }
    catch(exception){
        console.log('exceptione',exception);
        throw exception;
    }
}

export async function get_in_touch(email, message){
    try{
        const body = {email: email, message: message};
        const request = await make_request(API_URLS.USER_GET_IN_TOUCH, body);
        return request;
    }
    catch(exception){
        console.log('exception',exception);
        throw exception;
    }
}
