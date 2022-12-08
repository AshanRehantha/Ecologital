"use strict";

import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect, withRouter, useLocation } from "react-router";
import Applications from "../pages/Applications";
import AuthWrapper from "../pages/auth/AuthWrapper";
import { isUserLoginCheck } from "../_helpers/auth.helper";
import { clearMessage } from "../_redux/_actions/message.action";
import { PrivateRoute } from "./PrivateRouters";

const Routes = (props) => {
    const location = useLocation();
    const actionDispatch = useDispatch();
    useEffect(() => {
        actionDispatch(clearMessage());
    },[location]);
    return (
        <Fragment>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => {
                        return (
                            <Fragment>
                                {!isUserLoginCheck() ? (
                                    <AuthWrapper
                                        {...props}
                                    />
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: "customer/dashboard",
                                            state: {from : props.location},
                                        }}
                                    />
                                )}
                            </Fragment>
                        );
                    }}
                />
                <Route path="/create-new-user" component={AuthWrapper} />
                <Route path="/forget-password" component={AuthWrapper}  />
                <Route path="/password-reset" component={AuthWrapper}/>
                <PrivateRoute
                    path="/app/"
                    render={(props) => <Applications {...props} />}
                />
            </Switch>
        </Fragment>
    );
};

export default Routes;
