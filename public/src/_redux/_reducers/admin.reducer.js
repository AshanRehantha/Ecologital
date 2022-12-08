"use strict";

import { adminConstants } from "../_constants";

export const INITIAL_CUSTOMER_STATE = {
    userslist:[],
}

export function AdminReducer(state = INITIAL_CUSTOMER_STATE , action) {
    switch(action.type){
        case adminConstants.USERS_LIST_REQUEST:
            return {
                ...state,
                userslist:[]
            }
        case adminConstants.USERS_LIST_COMPLETE:
            return {
                ...state,
                userslist:action.payload
            }
        case adminConstants.USERS_LIST_ERROR:
            return {
                ...state,
                userslist:[]
            }
        case adminConstants.USER_EMAIL_UPDATE_REQUEST:
            return {
                ...state,
            }
        case adminConstants.USER_EMAIL_UPDATE_COMPLETE:
            return {
                ...state,
                userslist:action.payload
            }
        case adminConstants.USER_EMAIL_UPDATE_ERROR:
            return {
                ...state,
            }         
    }
    return state;
}