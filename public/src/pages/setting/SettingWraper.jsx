import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UiNavButton } from '../../components/_uiComponents/common/UiButton'
import { customerSettingSelectedForm } from '../../_redux/_actions';
import ChangepasswordForm from '../forms/ChangepasswordForm.setting';
import ChnageUserDetails from '../forms/ChnageUserDetails.setting';

const SettingWraper = () => {
  const { customer } = useSelector((state) => {
    return {
      customer: state.customer,
    };
  });
  const [selectform, setSelectform] = useState(customer.customer_selected_form_setting);
  const actionDispatch = useDispatch();

  const navButtonClick = (e) => {
    setSelectform(e.target.name);
    actionDispatch(customerSettingSelectedForm(e.target.name));
  }

  return (
    <React.Fragment>
        <div className='page-header'>
            <h1>Customer Setting</h1>
        </div>
        <div className='nav-button-wapper'>
            <UiNavButton
              onClick={navButtonClick}
              text={'Change Password'}
              name={'change-password'}
              active={selectform == 'change-password' || selectform == null ? true :  false}
            />
          <UiNavButton
            onClick={navButtonClick}
            text={'Change User Details'}
            name={'change-user-details'}
            active={selectform == 'change-user-details' ? true :  false}
          />
        </div>

        {
          selectform == 'change-password' || selectform == null ? 
          <ChangepasswordForm/> : 
          <ChnageUserDetails
            data = {customer.customer_data}
          />
        }
    </React.Fragment>
  )
}

export default SettingWraper