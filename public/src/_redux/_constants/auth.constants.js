"use strict";


export const authConstants = {
    USER_LOGIN_REQUEST:'USER_LOGIN_REQUEST',
    USER_LOGIN_COMPLETE:'USER_LOGIN_COMPLETE',
    USER_LOGIN_ERROR:'USER_LOGIN_ERROR',

    USER_REGISTER_REQUEST:'USER_REGISTER_REQUEST',
    USER_REGISTER_COMPLETE:'USER_REGISTER_COMPLETE',
    USER_REGISTER_ERROR:'USER_REGISTER_ERROR',

    USER_RESET_PASSWORD_REQUEST:'USER_RESET_PASSWORD_REQUEST',
    USER_RESET_PASSWORD_COMPLETE:'USER_RESET_PASSWORD_COMPLETE',
    USER_RESET_PASSWORD_ERROR:'USER_RESET_PASSWORD_ERROR',

    USER_PASSWORD_RESET_TOKEN_CHECK_REQUEST:'USER_PASSWORD_RESET_TOKEN_CHECK_REQUEST',
    USER_PASSWORD_RESET_TOKEN_CHECK_COMPLETE:'USER_PASSWORD_RESET_TOKEN_CHECK_COMPLETE',
    USER_PASSWORD_RESET_TOKEN_CHECK_ERROR:'USER_PASSWORD_RESET_TOKEN_CHECK_ERROR',

    USER_PASSWORD_RESET_REQUEST:'USER_PASSWORD_RESET_REQUEST',
    USER_PASSWORD_RESET_COMPLETE:'USER_PASSWORD_RESET_COMPLETE',
    USER_PASSWORD_RESET_ERROR:'USER_PASSWORD_RESET_ERROR',

    USER_PASSWORD_REQUEST_RESET_REQUEST:'USER_PASSWORD_REQUEST_RESET_REQUEST',
    USER_PASSWORD_REQUEST_RESET_COMPLETE:'USER_PASSWORD_REQUEST_RESET_COMPLETE',
    USER_PASSWORD_REQUEST_RESET_ERROR:'USER_PASSWORD_REQUEST_RESET_ERROR',

    USER_LOGOUT_REQUEST:'USER_LOGOUT_REQUEST',
    USER_LOGOUT_COMPLETE:'USER_LOGOUT_COMPLETE',
    USER_LOGOUT_ERROR:'USER_LOGOUT_ERROR',

    CLEAR_STORE:'CLEAR_STORE',
}

export const cookieConstants = {
    USER_TOKEN_ID: "uuid",
    FIRST_TIME_LOGIN: "is_first_time_user",
    USER_AUTH_TOKEN: "auth_token",
}