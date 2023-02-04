export function show_error_and_enable_button(setError, error_message, setButtonLoading){
    setError(error_message);
    setButtonLoading('');
}

export function hide_error_and_disable_button(setError, setButtonLoading){
    setError('');
    setButtonLoading(' disabled');
}

export function hide_error(setError){
    setError('');
}

export function hide_success(setSuccess){
    setSuccess(false);
}

export function show_error(setError, error){
    setError(error);
}