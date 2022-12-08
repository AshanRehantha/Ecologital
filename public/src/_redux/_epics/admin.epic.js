"use strict";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { mergeMap, catchError, concatMap } from "rxjs/operators";
import { getRequestHeader } from "../../_helpers/request.header";

import { adminConstants } from "../_constants";

import { ajaxError, ajaxSucess } from "../_actions/message.action";
import { 
    usersEmailUpdateCompleted,
    usersEmailUpdateError,
    usersListCompleted,
    usersListError, 
} from "../_actions";

export const usersListEpic = (actions$) =>
    actions$.pipe(
        ofType(adminConstants.USERS_LIST_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/admin/users/list",
                    action.payload,
                    getRequestHeader("POST"),
                ).pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            usersListCompleted(ajaxResponse.response.data.respond.data),
                            ajaxSucess(ajaxResponse.response.data.respond)
                        ),
                    ),
                    catchError((error) => of(usersListError(error), ajaxError(error))),
                );
        })
    )
export const usersEmailUpdateEpic = (actions$) =>
    actions$.pipe(
        ofType(adminConstants.USER_EMAIL_UPDATE_REQUEST),
        mergeMap((action) => {
            return ajax
                .post(
                    "/api/v1/admin/users/update",
                    action.payload,
                    getRequestHeader("POST"),
                ).pipe(
                    concatMap((ajaxResponse) => 
                        of(
                            usersEmailUpdateCompleted(ajaxResponse.response.data.respond.data),
                            ajaxSucess(ajaxResponse.response.data.respond)
                        ),
                    ),
                    catchError((error) => of(usersEmailUpdateError(error), ajaxError(error))),
                );
        })
    )    

