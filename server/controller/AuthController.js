const { createJwtToken } = require("../helper/auth.helper");
const logger = require("../logger");
const { CreateUser, userLogin, forget_password, forget_password_check_token_validate, user_change_password, user_logout} = require("../repository/auth/Auth.repository");
const { v4: uuidv4 } = require('uuid');
const { saveWithTTL, getValue } = require("../app/service/redis.server");
const { errorRespondReturn, respondRequest } = require("../helper/respondcode.helper");



async function createUser (req, res) {
    logger.info("Processing Method `/auth/auth.controller ->createNewUserRequest`")
    await CreateUser(req.body).then((result) => {
        return res.status(result.respondCode).send({
            data:respondRequest(
                result.status.statusCode, 
                result.status.message, 
            )
        })
    }).catch((err)=>{
        return res.status(400).send({
            status:{
                'statusCode':4000,
                'message':'We are sorry, things don’t appear to be working at the moment. Please try again later.',
                'errorDetails':{}
            }
        });
    })

}

async function login(req, res) {
    logger.info("Processing Method `/auth/auth.controller ->Login`")
    try{
        await userLogin(req.body).then((result) => {
            if(result.respondCode == 200){
                const token = createJwtToken(result.data._id.toString());
                const userID = uuidv4();
                res.cookie('auth_token',token, { httpOnly: false, maxAge: 3600000, sameSite: 'strict'});
                res.cookie('uuid', userID, { httpOnly: false, maxAge: 3600000, sameSite: 'strict'});
                res.cookie('is_first_time_user', true, {httpOnly: false, maxAge: 3600000, sameSite: 'strict'});
                saveWithTTL(userID, result.data._id.toString());
                let userdata = {
                    'firstname': result.data.customer_first_name,
                    'lastname': result.data.customer_last_name,
                    'customeraddress_primaty': result.data.customer_address,
                    'customer_address_other': result.data.customer_address_two,
                    'customerCity': result.data.customer_city,
                    'customerCountry': result.data.customer_country,
                    'customerState': result.data.customer_state,
                    'userType': result.data.userType,
                    'email': result.data.email,
                }
                return res.status(result.respondCode).send({
                    data:respondRequest(
                        result.status.statusCode, 
                        result.status.message, 
                        userdata,
                    )
                })
            }else{
                return res.status(result.respondCode).send({
                    data:respondRequest(result.status.statusCode, result.status.message, result.status.data)
                })
            }
        }).catch((err) => {
            logger.info(err)
            return res.status(400).send({
                status:{
                    'statusCode':4000,
                    'message':'We are sorry, things don’t appear to be working at the moment. Please try again later.',
                    'errorDetails':{}
                }
            });
        })
    }catch(err){
        console.log(err);
    }

}

async function forgetPassword (req, res){
    logger.info("Processing Method `/auth/auth.controller -> forget password`");
    try{
        await forget_password(req.body).then((result) => {
            return res.status(result.respondCode).send({
                data:respondRequest(result.statusCode, result.message, result.data)
            })
        }).catch((err) => {
            return res.status(400).send({
                data:errorRespondReturn(4000, null, err)
            });
        })
    }catch(err){
        logger.info(err);
        return res.status(400).send({
            data:errorRespondReturn(4000, null, err)
        });
    }
}

async function checkValidePasswordResetToken(req, res){
    logger.info("Processing Method `/auth/auth.controller -> forget password check tokan validate`");
    try{
        await forget_password_check_token_validate(req.body).then((result) => {
            let returnData = undefined;
            if(result.respondCode !== 400){
                returnData = {
                    firstname: result.data.name
                }
            }
            return res.status(result.respondCode).send({
                data:respondRequest(result.statusCode, result.message, returnData)
            })
        }).catch((err) => {
            console.log(err);
            return res.status(400).send({
                data:errorRespondReturn(4000, null, err)
            });
        })
    }catch(err){
        console.log(err);
        logger.info(err);
        return res.status(400).send({
            data:errorRespondReturn(4000, null, err)
        });
    }
}

async function changePassword(req, res){
    logger.info("Processing Method `/auth/auth.controller -> user change password`");
    try{
        await user_change_password(req.body).then((result) => {
            return res.status(result.respondCode).send({
                data:respondRequest(result.statusCode, result.message, undefined)
            })
        }).catch((err) => {
            return res.status(400).send({
                data:errorRespondReturn(4000, null, err)
            });
        })
    }catch(err){
        logger.info(err);
        return res.status(400).send({
            data:errorRespondReturn(4000, null, err)
        });
    }
}

async function logout(req, res){
    logger.info("Processing Method `/auth/auth.controller -> user logout`")
    try{
        let userId = await getValue(req.cookies.uuid);
        await user_logout(userId).then((result) => {
            res.clearCookie('auth_token');
            res.clearCookie('uuid');
            res.clearCookie('is_first_time_user');
            return res.status(result.respondCode).send({
                data:respondRequest(result.statusCode, result.message, undefined)
            })
        }).catch((err) => {
            res.clearCookie('auth_token');
            res.clearCookie('uuid');
            res.clearCookie('is_first_time_user');
            return res.status(400).send({
                data:errorRespondReturn(4000, null, err)
            });
        })
    }catch(err){
        res.clearCookie('auth_token');
        res.clearCookie('uuid');
        res.clearCookie('is_first_time_user');
        logger.info(err);
        return res.status(400).send({
            data:errorRespondReturn(4000, null, err)
        });
    }
}

module.exports = {
    forgetPassword,
    login,
    createUser,
    checkValidePasswordResetToken,
    changePassword,
    logout
}