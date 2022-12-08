import React from 'react'
import { Redirect, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import AdminSettingWrapper from '../pages/admin/setting/AdminSettingWrapper'
import DashboardWrapper from '../pages/dashboard/DashboardWrapper.page'
import SettingWraper from '../pages/setting/SettingWraper'
import { PrivateRoute } from './PrivateRouters'

const ApplicationRouter = (props) => {
  const { auth } = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });
  const url = props.match.url;
  return (
    <Switch>
        <PrivateRoute
            path={`${url}/dashboard`}
            render={(props) => <DashboardWrapper {...props} />}
        />
        <PrivateRoute
            path={`${url}/customer/setting`}
            render={(props) => <SettingWraper {...props} />}
        />
        {auth.user.userType == "1" ? 
        <PrivateRoute
            path={`${url}/admin/users`}
            render={(props) => <AdminSettingWrapper {...props} />}
        /> :                     
        <Redirect
        to={{
            pathname: '/app/dashboard',
        }}
        />
      }
    </Switch>
  )
}

export default ApplicationRouter