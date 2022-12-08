"use strict";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { mergeMap, catchError, concatMap } from "rxjs/operators";
import { getRequestHeader } from "../../_helpers/request.header";

import { authConstants } from "../_constants";
import { newUserRegisterCompleated, 
    newUserRegisterError, 
    passwordResetCompleted, 
    passwordResetError, 
    passwordResetTokenCheckCompleate, 
    passwordResetTokenCheckError, 
    userLoginCompleted, 
    userLoginError,
    passwordChangeUserComplete,
    passwordChangeUserError, 
    userLogoutComplete,
    userLogoutError,
    clearReducer} from "../_actions";
import { ajaxError, ajaxSucess } from "../_actions/message.action";
import { push } from "connected-react-router";

export const loginUserEpic = (actions$) =>
    actions$.pipe(
        ofType(authConstants.USER_LOGIN_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/auth/login",
                    action.payload,
                    getRequestHeader("POST"),
                ).pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            userLoginCompleted(ajaxResponse.response.data.respond),
                            push("/app/dashboard")
                        ),
                    ),
                    catchError((error) => of(userLoginError(error), ajaxError(error))),
                );
        })
    )

export const newUserRegisterEpic = (actions$) => 
    actions$.pipe(
        ofType(authConstants.USER_REGISTER_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/auth/register",
                    action.payload,
                    getRequestHeader("POST"),
                )
                .pipe(
                    concatMap((ajaxResponse) =>
                        of(
                            newUserRegisterCompleated(ajaxResponse.response),
                            push("/"),
                        ),
                    ),
                    catchError((error) => of(newUserRegisterError(error), ajaxError(error))),
                );
        }),
    )

export const resetPasswordEpic = (actions$) => 
    actions$.pipe(
        ofType(authConstants.USER_RESET_PASSWORD_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/auth/forget-password",
                    action.payload,
                    getRequestHeader("POST"),
                )
                .pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            passwordResetCompleted(ajaxResponse.response),
                            ajaxSucess(ajaxResponse.response.data.respond)
                        ),
                    ),
                    catchError((error) => of(passwordResetError(error), ajaxError(error))),
                );
        }),
    )
export const passwordResetRequestTokenCheckEpic = (actions$) => 
    actions$.pipe(
        ofType(authConstants.USER_PASSWORD_RESET_TOKEN_CHECK_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/auth/password-reset-token-check",
                    action.payload,
                    getRequestHeader("POST"),
                )
                .pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            passwordResetTokenCheckCompleate(ajaxResponse.response.data.respond.data),
                            ajaxSucess(ajaxResponse.response.data.respond)
                        ),
                    ),
                    catchError((error) => of(passwordResetTokenCheckError(error), ajaxError(error))),
                );
        })
    )

export const passwordResetEpic = (actions$) => 
    actions$.pipe(
        ofType(authConstants.USER_PASSWORD_REQUEST_RESET_REQUEST),
        mergeMap((action) => {
            return ajax
            .post(
                "/api/v1/auth/user-password-reset",
                action.payload,
                getRequestHeader("POST"),
            )
            .pipe(
                concatMap((ajaxResponse) => 
                    of(
                        passwordChangeUserComplete(ajaxResponse.response.data.respond.data),
                        ajaxSucess(ajaxResponse.response.data.respond)
                    ),
                ),
                catchError((error) => of(passwordChangeUserError(error), ajaxError(error))),
            );
        })
    )

export const logoutEpic = (actions$) =>
    actions$.pipe(
        ofType(authConstants.USER_LOGOUT_REQUEST),
        mergeMap((action) => {
            return ajax
            .post(
                "/api/v1/auth/logout",
                action.payload,
                getRequestHeader("POST"),
            )
            .pipe(
                concatMap((ajaxResponse) =>
                    of(
                      userLogoutComplete(ajaxResponse.response.data),
                      ajaxSucess(ajaxResponse.response.data.respond),
                      clearReducer(),
                      push("/"),
                    ),
                ),
                catchError((error) =>
                    of(userLogoutError(error), ajaxError(error))
                ),
            )
        })
    )