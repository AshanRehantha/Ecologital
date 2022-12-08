import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UiPrimaryButton } from '../../components/_uiComponents/common/UiButton'
import { UiFormsInputs } from '../../components/_uiComponents/common/UiInputs'
import LoadingComponent from '../../components/_uiComponents/loading.component';
import { customerInfoRequest, customerInfoUpdateRequest } from '../../_redux/_actions';

const ChnageUserDetails = (props) => {
  const actionDispatch = useDispatch();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [firstAddress, setFirstAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [country, setCountry] = useState(null);

  const loadUserDetails = useCallback(() => {
    actionDispatch(customerInfoRequest())
  }, [])

  const { message, loading } = useSelector((state) => {
    return {
      message: state.message,
      loading: state.loading,
      
    };
  });

  useEffect(() => {
    loadUserDetails();
  },[])

  function disabledButton() {
    if(firstName == "" || lastName == "" || address == "" || firstAddress == "" || city == "" || state == "" || city == "" || zip == "" || country == ""){
        return true;
    }
    return false;
  }

  const onClickUpdateUserData = () => {
    const payload = {
      firstname:firstName == null ? (props.data != undefined && props.data.first_name != undefined ? props.data.first_name : "") : firstName,
      lastname:lastName == null ? (props.data != undefined && props.data.last_name != undefined ? props.data.last_name : "") : lastName,
      address:address == null ? (props.data != undefined && props.data.address != undefined ? props.data.address : "") : address,
      addres_line:firstAddress == null ? (props.data != undefined && props.data.address_two != undefined ? props.data.address_two : "") : firstAddress,
      city:city == null ? (props.data != undefined && props.data.city != undefined ? props.data.city : "") : city,
      state:state == null ? (props.data != undefined && props.data.state != undefined ? props.data.state : "") : state,
      zip:zip == null ? (props.data != undefined && props.data.zip != undefined ? props.data.zip : "") : zip,
      country:country == null ? (props.data != undefined && props.data.country != undefined ? props.data.country : "") : country,
    }
    actionDispatch(customerInfoUpdateRequest(payload));
  }

  return (
    <React.Fragment>
    <LoadingComponent isloading={loading.show} />
    <div className='bcl-forms'>
      <Form>
        <span className='bcl-forms__header'>Basic Information</span>
        <div className='bcl-forms__wraper'>
            <label className='bcl-forms__label'>First Name</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"text"}
                placeholder={"First name"}
                maxLength={50}
                name={'first_name'}
                value={firstName == null ? (props.data != undefined && props.data.first_name != undefined ? props.data.first_name : "") : firstName}
                onchange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <label className='bcl-forms__label'>Last Name</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"text"}
                placeholder={"Last name"}
                maxLength={50}
                name={'last_name'}
                value={lastName == null ? (props.data != undefined && props.data.last_name != undefined ? props.data.last_name : "") : lastName}
                onchange={(e) => setLastName(e.target.value)}
              />
            </div>
        </div>
        <span className='bcl-forms__header'>Address Information</span>
        <div className='bcl-forms__wraper'>
          <label className='bcl-forms__label'>Address</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"text"}
                placeholder={"Address"}
                maxLength={300}
                name={'address'}
                value={address == null ? (props.data != undefined && props.data.address != undefined ? props.data.address : "") : address}
                onchange={(e) => setAddress(e.target.value)}
              />
            </div>
            <label className='bcl-forms__label'>Address Line 2</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"text"}
                placeholder={"Address Line (if needed)"}
                maxLength={300}
                name={'address_line_2'}
                value={firstAddress == null ? (props.data != undefined && props.data.address_two != undefined ? props.data.address_two : "") : firstAddress}
                onchange={(e) => setFirstAddress(e.target.value)}
              />
            </div>
            <label className='bcl-forms__label'>City</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"text"}
                placeholder={"City"}
                maxLength={300}
                name={'city'}
                value={city == null ? (props.data != undefined && props.data.city != undefined ? props.data.city : "") : city}
                onchange={(e) => setCity(e.target.value)}
              />
            </div>
            <label className='bcl-forms__label'>State</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"text"}
                placeholder={"State"}
                maxLength={300}
                name={'state'}
                value={state == null ? (props.data != undefined && props.data.state != undefined ? props.data.state : "") : state}
                onchange={(e) => setState(e.target.value)}
              />
            </div>
            <label className='bcl-forms__label'>ZIP</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"number"}
                placeholder={"ZIP Code"}
                maxLength={300}
                name={'zip'}
                value={zip == null ? (props.data != undefined && props.data.zip != undefined ? props.data.zip : "") : zip}
                onchange={(e) => setZip(e.target.value)}
              />
            </div>
            <label className='bcl-forms__label'>Country</label>
            <div className='col-8'>
              <UiFormsInputs
                type={"text"}
                placeholder={"Country"}
                maxLength={300}
                name={'country'}
                value={country == null ? (props.data != undefined && props.data.country != undefined ? props.data.country : "") : country}
                onchange={(e) => setCountry(e.target.value)}
              />
            </div>
        </div>
      </Form>
      <div className='col-4'>
            <UiPrimaryButton
                type={'submit'}
                text={'Update'}
                variant="primary"
                //disabled={disabledButton()}
                onClick={onClickUpdateUserData}
            />
      </div>
        <label className={message.is_error ? 'message message__error' : 'message message__sucess'} >
                          {message.messages != null ? message.messages : null}
        </label>
    </div>
  </React.Fragment>
  )
}

export default ChnageUserDetails