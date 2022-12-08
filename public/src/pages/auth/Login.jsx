import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UiButton_login } from '../../components/_uiComponents/common/UiButton'
import { UiInputs, UiInputsPassword } from '../../components/_uiComponents/common/UiInputs'
import LoadingComponent from '../../components/_uiComponents/loading.component';
import { newUserRegisterRequest, userLoginRequest } from '../../_redux/_actions/auth.action';

const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const actionDispatch = useDispatch();
  const { message, loading } = useSelector((state) => {
    return {
      message: state.message,
      loading: state.loading,
    };
  });
  const onClickLogin = () => {
    const payload = {
      name:username,
      password:password,
      userType:1
    }
    actionDispatch(userLoginRequest(payload));
  }

function disabledButton() {
  if(username == "" || password == ""){
    return true;
  }
}
  return (
    <React.Fragment>
      <LoadingComponent isloading={loading.show}/>
      <div className='login'>
            <div className='login_header'>
                <h3>Login</h3>
            </div>
            <p>Enter your username and password to login</p>
            <div className='login_form_container'>
                <div className='login_inputs'>
                  <UiInputs
                    type={"text"}
                    placeholder={"user name"}
                    maxLength={50}
                    name={'username'}
                    username={setUsername}
                  />
                </div>
                <div className='login_inputs login_inputs_password'>
                  <UiInputsPassword
                    type={"password"}
                    placeholder={"password"}
                    maxLength={50}
                    name={'password'}
                    password={setPassword}
                  />
                </div>
                <div className='login_inputs_button'>
                  <UiButton_login
                    type={'submit'}
                    text={'Login'}
                    disabled={disabledButton()}
                    onClick={onClickLogin}
                    variant="primary"
                  />
                </div>
                <a className='links links__right' href='/create-new-user'>Create new account</a>
                <a className='links links__left' href='/forget-password'>Forget Password</a>
                <label className='message message__error'>
                  {message.messages != null ? message.messages : null}
                </label>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Login