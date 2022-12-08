"use strict";

import { customerConstants } from "../_constants";

export const INITIAL_CUSTOMER_STATE = {
    customer_selected_form_setting:null,
    customer_data:null,
}

export function CustomerReducer(state = INITIAL_CUSTOMER_STATE , action) {
    switch(action.type){
        case customerConstants.CUSTOMER_SETTING_SELECTED_FORM:
            return {
                customer_selected_form_setting:action.payload,
            }
        case customerConstants.CUSTOMER_INFO_COMPLETE:
            return {
                ...state,
                customer_data:action.payload
            }    
    }
    return state;
}