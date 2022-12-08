"use strict";

import { commonConstants } from "../_constants"

export function ajaxError(error) {
    return {
        type: commonConstants.AJAX_ERROR,
        payload: error,
    };
}

export function ajaxSucess(sucess){
    return{
        type: commonConstants.AJEX_SUCESS,
        payload: sucess,
    }
}

export function clearMessage (){
    return {
        type:commonConstants.HIDE_FRONTEND_MESSAGE,
    }
}