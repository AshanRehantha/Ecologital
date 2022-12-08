"use strict";

import { commonConstants } from "../_constants";

const INITIAL_STATE = { pendingRequests: [], show: false };

export function loadingSpinnerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case commonConstants.ADD_PENDING_ACTIONS:
            return {
                show: true,
            }
        case commonConstants.REMOVE_PENDING_ACTIONS:
            return {
                show: false
            }    
    }
    return state;
}