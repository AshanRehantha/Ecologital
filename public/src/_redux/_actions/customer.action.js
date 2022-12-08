'use strict'

import { customerConstants } from "../_constants";

export const customerInfoRequest = (payload) => {
    return {
        type: customerConstants.CUSTOMER_INFO_REQUEST,
        payload,
    }
}

export const customerInfoCompleted = (payload) => {
    return {
        type:customerConstants.CUSTOMER_INFO_COMPLETE,
        payload,
    }
}

export const customerInfoError = (payload) => {
    return {
        type:customerConstants.CUSTOMER_INFO_ERROR,
        payload,
    }
}

export const customerInfoUpdateRequest = (payload) => {
    return {
        type: customerConstants.CUSTOMER_INFO_UPDATE_REQUEST,
        payload,
    }
}

export const customerInfoUpdateCompleted = (payload) => {
    return {
        type: customerConstants.CUSTOMER_INFO_UPDATE_COMPLETE,
        payload,
    }
}

export const customerInfoUpdateError = (payload) => {
    return {
        type: customerConstants.CUSTOMER_INFO_UPDATE_ERROR,
        payload,
    }
}

export const customerPasswotrdUpdateRequest = (payload) => {
    return {
        type: customerConstants.CUSTOMER_INFO_PASSWORD_UPDATE_REQUEST,
        payload,
    }
}

export const customerPassworddUpdateCompleted = (payload) => {
    return {
        type: customerConstants.CUSTOMER_INFO_PASSWORD_UPDATE_COMPLETE,
        payload,
    }
}

export const customerPassworddUpdateError = (payload) => {
    return {
        type: customerConstants.CUSTOMER_INFO_PASSWORD_UPDATE_ERROR,
        payload,
    }
}

export const customerSettingSelectedForm = (payload) => {
    return {
        type: customerConstants.CUSTOMER_SETTING_SELECTED_FORM,
        payload,
    }
}
