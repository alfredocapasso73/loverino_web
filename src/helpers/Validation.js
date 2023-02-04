export function validate_form(form_inputs){
    const found_invalid_input = form_inputs.filter(el => el.required && !el.ref.current.value);
    if(found_invalid_input.length){
        return false;
    }
    return true;
}

export function validate_login(fieldsRef){
    const result = {
        error: '',
        success: false
    };
    if(!fieldsRef.emailRef.current.value){
        result.error = 'SIGNUP_ERROR_MISSING_EMAIL';
        return result;
    }
    if(!fieldsRef.passwordRef.current.value){
        result.error = 'SIGNUP_ERROR_MISSING_PASSWORD';
        return result;
    }
    result.success = true;
    return result;
}

export function validate_signup(fieldsRef){
    const result = {
        error: '',
        success: false
    };
    if(!fieldsRef.nameRef.current.value){
        result.error = 'SIGNUP_ERROR_MISSING_NAME';
        return result;
    }
    if(!fieldsRef.emailRef.current.value){
        result.error = 'SIGNUP_ERROR_MISSING_EMAIL';
        return result;
    }
    if(!fieldsRef.passwordRef.current.value){
        result.error = 'SIGNUP_ERROR_MISSING_PASSWORD';
        return result;
    }
    if(fieldsRef.passwordRef.current.value.length < 6){
        result.error = 'SIGNUP_ERROR_BAD_PASSWORD';
        return result;
    }
    if(!fieldsRef.termsRef.current.checked){
        result.error = 'SIGNUP_ERROR_TERMS';
        return result;
    }
    result.success = true;
    return result;
}

export function validate_restore_password(passwordRef, password2Ref){
    const result = {
        error: '',
        success: false
    };
    if(!passwordRef.current.value || !password2Ref.current.value){
        result.error = 'PASSWORDS_CANNOT_BE_EMPTY';
        return result;
    }
    if(passwordRef.current.value.length < 6){
        result.error = 'SIGNUP_ERROR_BAD_PASSWORD';
        return result;
    }
    if(passwordRef.current.value !== password2Ref.current.value){
        result.error = 'PASSWORDS_DONT_MATCH';
        return result;
    }
    result.success = true;
    return result;
}
