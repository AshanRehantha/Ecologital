import Cookies from 'js-cookie';
import { cookieConstants } from '../_redux/_constants';

export const setCsrfToken = (token) => {
    Cookies.set("CSRF-TOKEN", token)
}

export const isUserLoginCheck = () => {
    const isUserLog = Cookies.get(cookieConstants.USER_TOKEN_ID);
    if(typeof isUserLog != "undefined"){
        return true;
    }
        return false;
}