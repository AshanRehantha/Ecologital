import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersListRequest } from '../../../_redux/_actions';
import UsersEditForm from './UsersEdit';

const AdminSettingWrapper = () => {
  const actionDispatch = useDispatch();

  const loadUserDetails = useCallback(() => {
    actionDispatch(usersListRequest())
  }, [])

  useEffect(() => {
    loadUserDetails();
  },[])

  return (
    <React.Fragment>
      <UsersEditForm/>
    </React.Fragment>
  )
}

export default AdminSettingWrapper