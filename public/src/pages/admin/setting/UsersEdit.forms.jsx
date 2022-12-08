import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { UiPrimaryButton } from '../../../components/_uiComponents/common/UiButton'
import { UiFormsInputs } from '../../../components/_uiComponents/common/UiInputs'
import { useDispatch, useSelector } from 'react-redux';
import { usersEmailUpdateRequest } from '../../../_redux/_actions'
import LoadingComponent from '../../../components/_uiComponents/loading.component'

const UsersEditForms= (props) => {
  const [email, setEmail] = useState("");
  const actionDispatch = useDispatch();

  const { loading, message } = useSelector((state) => {
    return {
      loading: state.loading,
      message: state.message,
    };
  });


  function disabledButton() {
    if(email == ""){
        return true
    }else{
        if(email === props.userEmail[0].email){
            return true
        }
        return false
    }
  }

  const onClick = () => {
    const payload = {
        oldemail:props.userEmail[0].email,
        email:email
    }
    actionDispatch(usersEmailUpdateRequest(payload))
    setEmail("");
  }

  return (
    <React.Fragment>
      <LoadingComponent isloading={loading.show} />
      <div className='bcl-forms'>
        <Form>
          <div className='bcl-forms__wraper'>
              <label className='bcl-forms__label'>Email</label>
              <div className='col-8'>
                <UiFormsInputs
                  type={"text"}
                  placeholder={"Email"}
                  maxLength={50}
                  name={'email'}
                  value={email == "" ? props.userEmail[0] != undefined ? props.userEmail[0].email : "" : email}
                  onchange={(e) => setEmail(e.target.value)}
                />
              </div>
          </div>
        </Form>
        <div className='col-4'>
              <UiPrimaryButton
                  type = {'submit'}
                  text = {'Update User Email'}
                  variant = "primary"
                  disabled = {disabledButton()}
                  onClick={onClick}
              />
        </div>
        <label className={message.is_error ? 'message message__error' : 'message message__sucess'} >
                          {message.messages != null ? message.messages : null}
        </label>
      </div>
    </React.Fragment>
  )
}

export default UsersEditForms