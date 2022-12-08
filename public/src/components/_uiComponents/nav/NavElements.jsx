import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutRequest } from '../../../_redux/_actions/auth.action';

const NavElements = (props) => {
  const history = useHistory();
  const actionDispatch = useDispatch();
  const OnClick = () => {
      if(props.pathname == 'logout'){
        actionDispatch(userLogoutRequest());
      }
      history.push(props.routename)
  }
  return (
    <li className='left-menu-item'>
      <a className='left-menu-item__link' onClick={OnClick}>
        <i className='left-menu-item__icon'>
          {props.icon}
        </i>
        <span className={props.isShow ? 'left-menu-item__lable--show' : 'left-menu-item__lable--hide'}>
          {props.label}
        </span>
      </a>
    </li>
  )
}

export default NavElements