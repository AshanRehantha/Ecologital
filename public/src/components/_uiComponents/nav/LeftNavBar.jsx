import React, { useState } from 'react'
import { HamMenu, HomeIcon, LogoutIcon, SettingIcon, AdminIcon } from '../common/svg'
import NavElements from './NavElements';
import { useSelector } from 'react-redux';

const LeftNavBar = () => {
    
    const [togel, setTogel] = useState(false);
    const SidebarTogel = () => {
        if(togel == true){
            setTogel(false);
        }else{
            setTogel(true);
        }
    }
    const { auth } = useSelector((state) => {
        return {
          auth: state.auth,
        };
      });
  return (
    <React.Fragment>
        <div className={!togel ? 'left-nav-bar  collapsed' : 'left-nav-bar  expand'}>
            <div className='left-nav-top-content'>
                <h2>ELO</h2>
            </div>
            <li className='left-menu-item'>
            <a className='left-menu-item__link' onClick={SidebarTogel}>
                <i className='left-menu-item__icon'>
                <HamMenu/>
                </i>
                <span className={togel ? 'left-menu-item--show' : 'left-menu-item--hide'}>Closed</span>
            </a>
            </li>
            <NavElements
                icon={<HomeIcon/>}
                pathname={'dashboard'}
                routename={'/app/dashboard'}
                label={'Dashboard'}
                isShow={togel}
            />
            <NavElements
                    icon={<SettingIcon/>}
                    pathname={'setting'}
                    routename={'/app/customer/setting'}
                    label={'Setting'}
                    isShow={togel}
                />
            {auth.user.userType == "1" && (
                <NavElements
                    icon={<AdminIcon/>}
                    pathname={'admin'}
                    routename={'/app/admin/users'}
                    label={'Admin'}
                    isShow={togel}
                />
            )}
            <NavElements
                icon={<LogoutIcon/>}
                pathname={'logout'}
                name={'Log Out'}
                label={'Log Out'}
                isShow={togel}
            />

        </div>
    </React.Fragment>
  )
}

export default LeftNavBar