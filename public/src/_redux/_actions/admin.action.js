'use strict'

import { adminConstants } from "../_constants";

export const usersListRequest = (payload) => {
    return {
        type: adminConstants.USERS_LIST_REQUEST,
        payload,
    }
}

export const usersListCompleted = (payload) => {
    return {
        type:adminConstants.USERS_LIST_COMPLETE,
        payload,
    }
}

export const usersListError = (payload) => {
    return {
        type:adminConstants.USERS_LIST_ERROR,
        payload,
    }
}

export const usersEmailUpdateRequest = (payload) => {
    return {
        type: adminConstants.USER_EMAIL_UPDATE_REQUEST,
        payload,
    }
}

export const usersEmailUpdateCompleted = (payload) => {
    return {
        type:adminConstants.USER_EMAIL_UPDATE_COMPLETE,
        payload,
    }
}

export const usersEmailUpdateError = (payload) => {
    return {
        type:adminConstants.USER_EMAIL_UPDATE_ERROR,
        payload,
    }
}