"use strict";

import { addPendingActions, removePendingActions } from "../_actions";


export const loadingSpineerMiddleware = (store) => (next) => (action) => {
    let isRequest = action.type.includes("REQUEST");
    let isComplete = action.type.includes("COMPLETE");
    let isError = action.type.includes("ERROR");

    if(isRequest) {
        store.dispatch(addPendingActions(action.type))
    }

    if (isComplete) {
        let actionType = action.type.split("COMPLETE")[0] + "REQUEST";
        store.dispatch(removePendingActions(actionType));
    }

    if (isError) {
        let actionType = action.type.split("ERROR")[0] + "REQUEST";
        store.dispatch(removePendingActions(actionType));
    }

    next(action);
}