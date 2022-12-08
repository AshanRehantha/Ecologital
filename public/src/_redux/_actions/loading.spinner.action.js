"use strict";

import { commonConstants } from "../_constants"

export function addPendingActions(payload){
    return {
        type: commonConstants.ADD_PENDING_ACTIONS,
        payload,
    }
}

export function removePendingActions(payload){
    return {
        type: commonConstants.REMOVE_PENDING_ACTIONS,
        payload,
    }
}