import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UiButton_login } from '../../../components/_uiComponents/common/UiButton'
import { UiCustomInputs } from '../../../components/_uiComponents/common/UiInputs'
import { newUserRegisterRequest } from '../../../_redux/_actions/auth.action';

const CreateNewUser = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const actionDispatch = useDispatch();
  const { message } = useSelector((state) => {
    return {
      message: state.message
    };
  });

  const onClickLogin = () => {
    const payload = {
      name:username,
      password:password,
      email:email,
      firstname:firstname,
      lastname:lastname,
      userType:1
    }
    actionDispatch(newUserRegisterRequest(payload));
  }

    function disabledButton() {
        if(username == "" || password == "" || email == "" || firstname == "" || lastname == "" ){
            return true;
        }
        return false;
    }

    function emalValidate(){
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email.match(emailRegex)){
        return false;
      }
      return true;
    }

  return (
    <div className='login'>
        <div className='login_header'>
            <h3>Create New User</h3>
        </div>
        <p>Enter your details to create new user</p>
        <div className='login_form_container'>
            <div className='login_inputs'>
              <UiCustomInputs
                type={"text"}
                placeholder={"User name"}
                maxLength={50}
                name={'username'}
                value={username}
                onchange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='login_inputs'>
              <UiCustomInputs
                type={"password"}
                placeholder={"password"}
                maxLength={50}
                name={'password'}
                value={password}
                onchange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='login_inputs'>
              <UiCustomInputs
                type={"text"}
                placeholder={"Email"}
                maxLength={50}
                name={'username'}
                value={email}
                onchange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='login_inputs'>
              <UiCustomInputs
                type={"text"}
                placeholder={"First Name"}
                maxLength={50}
                name={'username'}
                value={firstname}
                onchange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className='login_inputs'>
              <UiCustomInputs
                type={"text"}
                placeholder={"Last Name"}
                maxLength={50}
                name={'username'}
                value={lastname}
                onchange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className='login_inputs_button'>
              <UiButton_login
                type={'submit'}
                text={'Register'}
                disabled={disabledButton() || emalValidate()}
                onClick={onClickLogin}
                variant="primary"
              />
            </div>
            <a className='links links__right' href='/'>Log in</a>
            <label className='message message__error'>
              {message.messages != null ? message.messages : null}
            </label>
        </div>
    </div>
  )
}

export default CreateNewUser