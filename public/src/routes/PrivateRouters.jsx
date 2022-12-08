import React from 'react'
import { Redirect, Route, withRouter } from 'react-router'
import { isUserLoginCheck } from '../_helpers/auth.helper'


export const PrivateRoute = withRouter(({ render: render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return isUserLoginCheck() ? (
                    render(props)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state:{from: props.location},
                        }}
                    />
                )
            }}
        />
    )
})