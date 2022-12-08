"use strict";

import { authConstants } from "../_constants";

export const INITIAL_AUTH_STATE = {
    password_reset_token_valide:null,
    password_reset_first_name:null,
    password_reset_sucess:false,
    user:null,
}

export function auth(state = INITIAL_AUTH_STATE, action){
    switch(action.type){
        case authConstants.USER_PASSWORD_RESET_TOKEN_CHECK_REQUEST:
            return {
                ...state,
                password_reset_token_valide:null,
                password_reset_sucess:false,
            }
        case authConstants.USER_PASSWORD_RESET_TOKEN_CHECK_COMPLETE:
            return {
                ...state,
                password_reset_token_valide:true,
                password_reset_first_name:action.payload,
                password_reset_sucess:false,
            }
        case authConstants.USER_PASSWORD_RESET_TOKEN_CHECK_ERROR:
            return {
                ...state,
                password_reset_token_valide:false,
                password_reset_sucess:false,
            }  
        case authConstants.USER_PASSWORD_REQUEST_RESET_REQUEST:
            return {
                ...state,
                password_reset_sucess: false,
            }
        case authConstants.USER_PASSWORD_REQUEST_RESET_COMPLETE:
            return {
                ...state,
                password_reset_sucess: true,
            } 
        case authConstants.USER_PASSWORD_REQUEST_RESET_ERROR:
            return {
                ...state,
                password_reset_sucess: false,
            }
        case authConstants.USER_LOGIN_COMPLETE:
            return {
                ...state,
                user:action.payload.data
            }  
    }
    return state;
}