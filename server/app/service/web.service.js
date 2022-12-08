
const csrf = require('csurf');
const { veryfyJWTToken } = require('../../helper/auth.helper');
const { errorRespondReturn } = require('../../helper/respondcode.helper');
const { getValue } = require('./redis.server');

module.exports = function sendRequestWithAuth(req, res, next) {
    const preRequestApi = [
    '/api/v1/auth/login', 
    '/api/v1/auth/register', 
    '/api/v1/auth/forget-password', 
    '/api/v1/auth/password-reset-token-check',
    '/api/v1/auth/user-password-reset'];
    if(preRequestApi.includes(req.url)){
        next();
    }else{
        if(req.cookies != undefined){
           if(veryfyJWTToken(req.cookies.auth_token) == true){
                next();
           }else{
                res.clearCookie('auth_token');
                res.clearCookie('uuid');
                res.clearCookie('is_first_time_user');
                return res.status(401).send({
                    data:errorRespondReturn(401, 'Unauthorized login', '')
                });
           }
        }else{
            return res.status(401).send({
                data:errorRespondReturn(401, 'Unauthorized login', '')
            });
        }
    }
}