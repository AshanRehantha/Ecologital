"use strict";

import { commonConstants } from "../_constants";

const INITIAL_ERROR_MESSAGE_STATE = {
    show: false,
    messages: null,
    is_error:null,
};

export function MessageReducer (state = INITIAL_ERROR_MESSAGE_STATE, action){
    switch(action.type){
        case commonConstants.SHOW_FRONTEND_ERROR_MESSAGE:
            return {
                show: true,
                messages:action.payload.message,
                is_error: true,
            }
        case commonConstants.SHOW_FRONTEND_SUCESS_MESSAGE:
            return{
                show: true,
                messages:action.payload.message,
                is_error: false,
            }    
        case commonConstants.HIDE_FRONTEND_MESSAGE:
            return{
                show: false,
                message: null,
                is_error: null,
            }
    }

    return state;
}
