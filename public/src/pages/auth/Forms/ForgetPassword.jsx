import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UiButton_login } from '../../../components/_uiComponents/common/UiButton';
import { UiCustomInputs } from '../../../components/_uiComponents/common/UiInputs';
import { passwordResetRequest } from '../../../_redux/_actions/auth.action';

const ForgetPassword = () => {
  const actionDispatch = useDispatch();
  const [username, setUsername] = useState("");

  const { message } = useSelector((state) => {
    return {
      message: state.message
    };
  });


  
  function disabledButton(){
    if(username == ""){
        return true;
    }
        return false;
  }

  const onClickForgetPassword = () => {
        let payload = {
            name: username,
        }
        actionDispatch(passwordResetRequest(payload));
        setUsername("");
  }

  return (
        <div className='login'>
        <div className='login_header'>
            <h3>Reset Your Password</h3>
        </div>
        <p>Don’t worry, happens to the best of us.</p>
        <div className='login_form_container'>
            <div className='login_inputs'>
              <UiCustomInputs
                type={"text"}
                placeholder={"User name"}
                maxLength={50}
                name={'username'}
                onchange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className='login_inputs_button'>
              <UiButton_login
                type={'submit'}
                text={'Reset Password'}
               disabled={disabledButton()}
               onClick={onClickForgetPassword}
                variant="primary"
              />
            </div>
            <a className='links links__right' href='/'>Return to login</a>
            <br/>
            <label className={message.is_error ? 'message message__error' : 'message message__sucess'} >
              {message.messages != null ? message.messages : null}
            </label>
        </div>
    </div>
  )
}

export default ForgetPassword