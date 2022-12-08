import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UiPrimaryButton } from '../../components/_uiComponents/common/UiButton';
import { UiFormsInputs } from '../../components/_uiComponents/common/UiInputs';
import LoadingComponent from '../../components/_uiComponents/loading.component';
import { customerPasswotrdUpdateRequest } from '../../_redux/_actions';

const ChangepasswordForm = () => {

  const actionDispatch = useDispatch();
  const [curentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, serReNewPassword] = useState("");

  function disabledButton() {
    if(curentPassword == "" || newPassword == "" || reNewPassword == ""){
        return true
    }else{
      if(newPassword == reNewPassword && (curentPassword != newPassword)){
        return false
      }
      return true
    }
  }

  const { loading, message } = useSelector((state) => {
    return {
      loading: state.loading,
      message: state.message,
    };
  });

  const onClick = () => {
    const payload = {
      old_password:curentPassword,
      new_password:newPassword
    }
    actionDispatch(customerPasswotrdUpdateRequest(payload))
  }

  useEffect(() => {
    if(!message.is_error){
      setCurrentPassword("");
      setNewPassword("");
      serReNewPassword("");
    }
  }, [message.is_error])

  return (
    <React.Fragment>
      <LoadingComponent isloading={loading.show} />
      <div className='bcl-forms'>
        <Form>
          <span className='bcl-forms__header'>Change Password</span>
          <div className='bcl-forms__wraper'>
              <label className='bcl-forms__label'>Current Password</label>
              <div className='col-8'>
                <UiFormsInputs
                  type={"password"}
                  placeholder={"Current Password"}
                  maxLength={50}
                  name={'first_name'}
                  value={curentPassword}
                  onchange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <label className='bcl-forms__label'>New Password</label>
              <div className='col-8'>
                <UiFormsInputs
                  type={"password"}
                  placeholder={"New Password"}
                  maxLength={50}
                  name={'first_name'}
                  value={newPassword}
                  onchange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <label className='bcl-forms__label'>ReEnter Password</label>
              <div className='col-8'>
                <UiFormsInputs
                  type={"password"}
                  placeholder={"Current Password"}
                  maxLength={50}
                  name={'first_name'}
                  value={reNewPassword}
                  onchange={(e) => serReNewPassword(e.target.value)}
                />
              </div>
          </div>
        </Form>
        <div className='col-4'>
              <UiPrimaryButton
                  type={'submit'}
                  text={'Reset Password'}
                  variant="primary"
                  onClick={onClick}
                  disabled={disabledButton()}
              />
        </div>
        <label className={message.is_error ? 'message message__error' : 'message message__sucess'} >
                          {message.messages != null ? message.messages : null}
        </label>
      </div>
    </React.Fragment>

  )
}

export default ChangepasswordForm