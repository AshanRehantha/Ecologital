"use strict";

import { customErrorMessage, customSucessMessage } from "../../_helpers/custom.message";
import { commonConstants } from "../_constants/common.constants";

const messageMiddleware = (store) => (next) => (action) => {
    let response = "";
    if(action.type === commonConstants.AJAX_ERROR) {
        response = customErrorMessage(action.payload.response.data);
        store.dispatch({
            type:commonConstants.SHOW_FRONTEND_ERROR_MESSAGE,
            payload:response,
        })
    }
    if(action.type === commonConstants.AJEX_SUCESS){
        response = customSucessMessage(action.payload.status);
        store.dispatch({
            type:commonConstants.SHOW_FRONTEND_SUCESS_MESSAGE,
            payload:response,
        })
    }
    next(action);
}

export { messageMiddleware };
