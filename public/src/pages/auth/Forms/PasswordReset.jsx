import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { passwordResetTokenCheckRequest } from '../../../_redux/_actions/auth.action';
import { UiButton_login } from '../../../components/_uiComponents/common/UiButton';
import { UiCustomInputs } from '../../../components/_uiComponents/common/UiInputs';
import { ClosedIcon, TickIcon } from '../../../components/_uiComponents/common/svg';
import { passwordChangeUserRequest } from '../../../_redux/_actions/auth.action';
import LoadingComponent from '../../../components/_uiComponents/loading.component';
const PasswordReset = (props) => {
    const actionDispatch = useDispatch();
    const token = props.location.search.replace("?token=", '');

    const { message, auth, loading } = useSelector((state) => {
        return {
          message: state.message,
          auth: state.auth,
          loading: state.loading,
        };
      });

    const [password, setPassword] = useState("");
    const [reEnterpassword, setReEnterpassword] = useState("");
    const [lowercaseinclude, setLowercaseinclude] = useState(false);
    const [minimumcharactor, setMinimumchatactor] = useState(false);
    const [usernameInclude, setUsernameinclude] = useState(false);
    const [reenterpasswordmatch, setReenterpasswordmatch] = useState(false);

    const validateToken = useCallback(() => {
        actionDispatch(passwordResetTokenCheckRequest({token: token}));
    });

    useEffect(() => {
        validateToken();
    },[token]);

    const onClickChangePassword = () => {
        const payload = {
            password:password,
            token:token,
        }
        actionDispatch(passwordChangeUserRequest(payload));
        setPassword("");
        setReEnterpassword("");
    }

    useEffect(() => {
        if(password.length > 8){
            setMinimumchatactor(true);
        }else{
            setMinimumchatactor(false);
        }
        if(password != "" && reEnterpassword != ""){
            if(password == reEnterpassword){
                setReenterpasswordmatch(true)
            }else{
                setReenterpasswordmatch(false)
            }
        }else{
            setReenterpasswordmatch(false)
        }
        var re = new RegExp("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$");
        if (re.test(password)) {
            setLowercaseinclude(true)
        } else {
            setLowercaseinclude(false)
        }

        if(auth.password_reset_first_name != null && !auth.password_reset_first_name.firstname.match(password)){
            setUsernameinclude(true);
        }else{
            setUsernameinclude(false)
        }

    },[password, reEnterpassword])
    function disabledButton(){
        var re = new RegExp("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$");
        if(password == "" || reEnterpassword == ""){
            return true;
        }else{
            if(password == reEnterpassword){
                if(password.length > 8){
                    if (re.test(password)) {
                        if(auth.password_reset_first_name.firstname.match(password)){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }
      } 
  return (
    <React.Fragment>
        <LoadingComponent isloading={loading.show}/>
        {
        auth.password_reset_token_valide || auth.password_reset_token_valide == null ? 
            (
            <React.Fragment>
                <div className='login'>
                    <div className='login_header'>
                        <h3>Change Your Password</h3>
                    </div>    
                        <div className='login_form_container'>
                    <div className='login_inputs'>
                    <UiCustomInputs
                        type={"password"}
                        placeholder={"New password"}
                        maxLength={50}
                        name={'new_password'}
                        onchange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    </div>
                    <div className='login_inputs'>
                    <UiCustomInputs
                        type={"password"}
                        placeholder={"Re-enter password"}
                        maxLength={50}
                        name={'re_new_password'}
                        onchange={(e) => setReEnterpassword(e.target.value)}
                        value={reEnterpassword}
                    />
                    </div>
                    <div className='login_inputs_button'>
                    <UiButton_login
                        type={'submit'}
                        text={'Change Password'}
                        disabled={disabledButton()}
                        onClick={onClickChangePassword}
                        variant="primary"
                    />
                    </div>
                    {auth.password_reset_sucess != undefined && auth.password_reset_sucess != false ?
                    <a className='links links__right' href='/'>Return to login</a> : ""
                    }
                    </div>
                    <br/><br/>
                    <div className='password-guild'>
                        <ul>
                            <li>{reenterpasswordmatch ? <TickIcon/> : <ClosedIcon />}re enter password match</li>
                            <li>{lowercaseinclude ? <TickIcon/> : <ClosedIcon />} atleast one upper case and lower case letter must include</li>
                            <li>{minimumcharactor ? <TickIcon/> : <ClosedIcon />} minimum 8 alphanumeric characters required</li>
                            <li>{usernameInclude ? <TickIcon/> : <ClosedIcon />} first name can not be include</li>
                        </ul>
                    </div>
                    <label className={message.is_error ? 'message message__error' : 'message message__sucess'} >
                        {message.messages != null ? message.messages : null}
                    </label>
                </div>
            </React.Fragment>
            ) :
            (
            <React.Fragment>
            <div className='login'>
                <div className='login_header'>
                    <h3>Change Your Password</h3>
                </div>
                <p>Invalide password request tokan please check email and click correct password reset link</p>
            </div>
            </React.Fragment>
            )
        }
    </React.Fragment>   
  )
}

export default PasswordReset