"use strict";

import { respondCode } from "../_redux/_constants";

const customErrorMessage = (errorRespond) => {
        /** Auth Error Messages */
    if(errorRespond.statusCode != undefined){
        if(errorRespond.statusCode == respondCode.AUTH_USER_EMAIL_ALREADY_EXISTING){
            errorRespond.message = "Email already exists"
        }
        if(errorRespond.statusCode == respondCode.AUTH_USER_NAME_ALREADY_EXISTING){
            errorRespond.message = "User name already exists"
        }
        if(errorRespond.statusCode == respondCode.AUTH_NEW_REGISTER_QUERY_ERROR){
            errorRespond.message = "We are sorry, things don’t appear to be working at the moment. Please try again later."
        }
        if(errorRespond.statusCode == respondCode.AUTH_LOGIN_USER_PASSWORD_INCORRECT){
            errorRespond.message = "Incorrect user name or password. Type the correct user name and password, and try again."
        }
        if(errorRespond.statusCode == respondCode.UNAUTHORIZ_ERROR){
            errorRespond.message = "Unauthorized error, please contact system administrator."
        }
        if(errorRespond.statusCode == respondCode.AUTH_USER_NAME_NOT_EXSTING){
            errorRespond.message = "Hmmm... We can’t seem to find your account."
        }
        if(errorRespond.statusCode == respondCode.AUTH_USER_PASSWORD_EXPIRE_CODE_INVALIDE){
            errorRespond.message = "Hmmm... We can’t seem to you find your password reset tokan please check your email and try again."
        }
        
    }
    else{
        if(errorRespond.data.status.statusCode == respondCode.AUTH_LOGIN_USER_PASSWORD_INCORRECT){
            errorRespond.message = "Incorrect user name or password. Type the correct user name and password, and try again."
        }
    }
    return errorRespond
}

const customSucessMessage = (sucessRespond) => {
    if(sucessRespond.statusCode == respondCode.PASSWORD_RESET_SUCESS){
        sucessRespond.message = "You’r password change request has been send please check the email and reset your password."
    }
    if(sucessRespond.statusCode == respondCode.VALIDE_TOKEN){
        sucessRespond.message = null;
    }
    if(sucessRespond.statusCode == respondCode.USER_PASSWORD_CHANGE_SUCESS){
        sucessRespond.message = 'You’r password has been update. Please return the login page.'
    }
    if(sucessRespond.statusCode == respondCode.CUSTOMER_INFO_UPDATE){
        sucessRespond.message = 'You’r user details has been update.'
    }
    if(sucessRespond.statusCode == respondCode.CUSTOMER_PASSWORD_UPDATE){
        sucessRespond.message = 'You’r user password has been update.'
    }
    if(sucessRespond.statusCode == respondCode.ADMIN_USERS_UPDATE_SUCESS){
        sucessRespond.message = 'user email has been update.'
    }

    return sucessRespond
}

export {
    customErrorMessage,
    customSucessMessage
}