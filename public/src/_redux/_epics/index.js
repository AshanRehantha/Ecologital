"use strict";

import { combineEpics } from "redux-observable";

import {
    newUserRegisterEpic,
    loginUserEpic,
    resetPasswordEpic,
    passwordResetRequestTokenCheckEpic,
    passwordResetEpic,
    logoutEpic,
} from "./auth.epic";

import {
    customerInfoEpic,
    customerInfoUpdateEpic,
    customerChangePasswordEpic
} from "./customer.epic"

import {
    usersListEpic,
    usersEmailUpdateEpic,
} from './admin.epic'

export default combineEpics(
    newUserRegisterEpic,
    loginUserEpic,
    resetPasswordEpic,
    passwordResetRequestTokenCheckEpic,
    passwordResetEpic,
    logoutEpic,
    customerInfoEpic,
    customerInfoUpdateEpic,
    customerChangePasswordEpic,
    usersListEpic,
    usersEmailUpdateEpic,
)