'use strict'

import { authConstants } from "../_constants"

export const userLoginRequest = (payload) => {
    return {
        type: authConstants.USER_LOGIN_REQUEST,
        payload,
    }
}

export const userLoginCompleted = (payload) => {
    return {
        type:authConstants.USER_LOGIN_COMPLETE,
        payload,
    }
}

export const userLoginError = (payload) => {
    return {
        type:authConstants.USER_LOGIN_ERROR,
        payload,
    }
}


export const newUserRegisterRequest = (payload) => {
    return {
        type: authConstants.USER_REGISTER_REQUEST,
        payload,

    }
}

export const newUserRegisterCompleated = (payload) => {
    return {
        type: authConstants.USER_REGISTER_COMPLETE,
        payload,

    }
}

export const newUserRegisterError = (payload) => {
    return {
        type: authConstants.USER_REGISTER_ERROR,
        payload,

    }
}

export const passwordResetRequest = (payload) => {
    return {
        type: authConstants.USER_RESET_PASSWORD_REQUEST,
        payload,
    }
}

export const passwordResetCompleted = (payload) => {
    return {
        type: authConstants.USER_RESET_PASSWORD_COMPLETE,
        payload,
    }
}

export const passwordResetError = (payload) => {
    return {
        type: authConstants.USER_RESET_PASSWORD_ERROR,
        payload,
    }
}

export const passwordResetTokenCheckRequest = (payload) => {
    return {
        type: authConstants.USER_PASSWORD_RESET_TOKEN_CHECK_REQUEST,
        payload,
    }
}

export const passwordResetTokenCheckCompleate = (payload) => {
    return {
        type: authConstants.USER_PASSWORD_RESET_TOKEN_CHECK_COMPLETE,
        payload,
    }
}

export const passwordResetTokenCheckError = (payload) => {
    return {
        type: authConstants.USER_PASSWORD_RESET_TOKEN_CHECK_ERROR,
        payload,
    }
}

export const passwordChangeUserRequest = (payload) => {
    return {
        type: authConstants.USER_PASSWORD_REQUEST_RESET_REQUEST,
        payload,
    }
}

export const passwordChangeUserComplete = (payload) => {
    return {
        type: authConstants.USER_PASSWORD_REQUEST_RESET_COMPLETE,
        payload,
    }
}

export const passwordChangeUserError = (payload) => {
    return {
        type: authConstants.USER_PASSWORD_REQUEST_RESET_ERROR,
        payload,
    }
}

export const userLogoutRequest = (payload) => {
    return {
        type: authConstants.USER_LOGOUT_REQUEST,
        payload,
    }
}

export const userLogoutComplete = (payload) => {
    return{
        type: authConstants.USER_LOGOUT_COMPLETE,
        payload,
    }
}

export const userLogoutError = (payload) => {
    return {
        type: authConstants.USER_LOGOUT_ERROR,
        payload
    }
}

export const clearReducer = () => {
    return {
        type: authConstants.CLEAR_STORE
    }
}