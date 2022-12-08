import React from 'react';
import { UiBasicDropDown } from '../../../components/_uiComponents/common/UIdropdowns';
import { useDispatch, useSelector } from 'react-redux';
import UsersEditForms from './UsersEdit.forms';
import { useState } from 'react';

const UsersEditForm = () => {
  const [email, setEmail] = useState("");
  const { admin } = useSelector((state) => {
    return {
      admin: state.admin,
    };
  });

  const OnClick = (e) => {
    setEmail(e.target.value)
  }
    
  return (
    <React.Fragment>
        <UiBasicDropDown
          onClick={OnClick}
          userlist={admin.userslist}
        />
        <UsersEditForms
          userEmail={admin.userslist.filter(user => user.email === email)}
        />
    </React.Fragment>
  )
}

export default UsersEditForm