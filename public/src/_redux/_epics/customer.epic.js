"use strict";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { mergeMap, catchError, concatMap } from "rxjs/operators";
import { getRequestHeader } from "../../_helpers/request.header";

import { customerConstants } from "../_constants";

import { ajaxError, ajaxSucess } from "../_actions/message.action";
import { push } from "connected-react-router";
import { customerInfoCompleted, customerInfoError, customerInfoUpdateCompleted, customerInfoUpdateError, customerPassworddUpdateCompleted, customerPassworddUpdateError } from "../_actions";

export const customerInfoEpic = (actions$) =>
    actions$.pipe(
        ofType(customerConstants.CUSTOMER_INFO_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/customer/info",
                    action.payload,
                    getRequestHeader("POST"),
                ).pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            customerInfoCompleted(ajaxResponse.response.data.respond.data),
                            ajaxSucess(ajaxResponse.response.data.respond)
                        ),
                    ),
                    catchError((error) => of(customerInfoError(error), ajaxError(error))),
                );
        })
    )

export const customerInfoUpdateEpic = (actions$) => 
    actions$.pipe(
        ofType(customerConstants.CUSTOMER_INFO_UPDATE_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/customer/update",
                    action.payload,
                    getRequestHeader("POST")
                ).pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            customerInfoUpdateCompleted(ajaxResponse.response),
                            ajaxSucess(ajaxResponse.response.data.respond)
                        ),
                    ),
                    catchError((error) => of(customerInfoUpdateError(error), ajaxError(error))),
                );
        })
    )

export const customerChangePasswordEpic = (actions$) => 
    actions$.pipe(
        ofType(customerConstants.CUSTOMER_INFO_PASSWORD_UPDATE_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/customer/update-password",
                    action.payload,
                    getRequestHeader("POST")
                ).pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            customerPassworddUpdateCompleted(ajaxResponse.response),
                            ajaxSucess(ajaxResponse.response.data.respond)
                        ),
                    ),
                    catchError((error) => 
                        of(
                            customerPassworddUpdateError(error),
                            ajaxError(error)
                        )
                    )
                )
        })
    )