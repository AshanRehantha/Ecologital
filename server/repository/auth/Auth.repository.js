const bcrypt = require('bcrypt');
const { serverRespondCode } = require('../../helper/respondcode.helper');
const logger = require('../../logger');
const { ForgetPassword } = require('../../models/forget_password.model');
const { User } = require('../../models/user.models');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { sendMalil } = require('../../app/service/email.sendmail.service');

exports.CreateUser = async (request) => {
    const salt = await bcrypt.genSalt(15);
    try{
        let newUser = new User({
            name:request.name,
            email:request.email,
            password:await bcrypt.hash(request.password, salt),
            userType:"2",
        });
        return await User.find({ $or:[{email: request.email}, {name: request.name}]}).then((data) => {
            if(data.length == 0){
                return newUser.save().then(() => {
                    return {
                        respondCode:200,             
                        status:{
                            'statusCode':3200,
                            'message':'User create sucess',
                            'errorDetails':{}
                        }
                    }
                }).catch((err) => {
                    if(err.code === 11000){
                        return{
                            respondCode:400,
                            status:{
                                'statusCode':serverRespondCode().user_email_already_exsisit,
                                'message':'User name already exists',
                                'errorDetails':{}
                            }
                        }
                    }else{
                        return{
                            respondCode:400,
                            status:{
                                'statusCode':serverRespondCode().create_user_search_error,
                                'message':'User name already exists',
                                'errorDetails':{err}
                            }
                        }  
                    }
        
                })
            }else {
                if(data[0].email == request.email){
                    return{
                        respondCode:400,
                        status:{
                            'statusCode':serverRespondCode().user_email_already_exsisit,
                            'message':'User email already exists',
                            'errorDetails':{}
                        }
                    }
                }else{
                    return{
                        respondCode:400,
                        status:{
                            'statusCode':serverRespondCode().user_name_already_exsisit,
                            'message':'User name already exists',
                            'errorDetails':{}
                        }
                    }
                }
            }
        })
    }catch(err){
        return {
            respondCode:400,
            status:{
                'statusCode':5000,
                'message':'We are sorry, things don’t appear to be working at the moment. Please try again later.',
                'errorDetails':{}
            }
        }
    }
}

exports.userLogin = async(request) => {
    const userProjectedValue = {
        __v: false,
    }
    try{
        return await User.find({ $or:[{email: request.name}, {name: request.name}]}, userProjectedValue).then((data) => {
            if(data.length != 0){
                return bcrypt.compare(request.password, data[0].password).then(doMatch => {
                    if(doMatch){
                        User.findOneAndUpdate({name: data[0].name}, {userLogin: true})
                        return{
                            respondCode:200,
                            status:{
                                'statusCode':00,
                                'message':'',
                                'errorDetails':{},
                            },
                            data:data[0]
                        }
                    }else{
                        return{
                            respondCode:400,
                            status:{
                                'statusCode':3212,
                                'message':'user name or password incorrect',
                                'errorDetails':{}
                            }
                        }
                    }
                })
            }else{
                return{
                    respondCode:400,
                    status:{
                        'statusCode':3212,
                        'message':'user name or password incorrect',
                        'errorDetails':{}
                    }
                }
            }
        })
    }catch(err){
        logger.info(err);
        return {
            respondCode:400,
            status:{
                'statusCode':5000,
                'message':'We are sorry, things don’t appear to be working at the moment. Please try again later.',
                'errorDetails':{}
            }
        }
    }
}

exports.forget_password = async(request) => {
    try{
        return await User.find({ $or:[{email: request.name}, {name: request.name}]}).then((data) => {
            if(data.length != 0){
                let gen_uuid = uuidv4();
                let Forget_password = new ForgetPassword({
                    email:data[0].email,
                    name:data[0].name,
                    request_date:moment().format("YYYY-MM-DD"),
                    update_date:moment().format("YYYY-MM-DD"),
                    uuid:gen_uuid,
                });
                const front_end_url = process.env.FRONT_END_URL;
                let sendMaliParms = {
                    email:data[0].email,
                    name:data[0].name,
                    uuid:gen_uuid,
                    forget_password_link:`${front_end_url}password-reset?token=${gen_uuid}`
                }
                return ForgetPassword.find({ $or:[{email: request.name}, {name: request.name}], $and:[{status: true}]}).then((data) => {
                    if(data.length != 0){
                        const update_id = {
                            request_date:moment().format("YYYY-MM-DD"),
                            update_date:moment().format("YYYY-MM-DD"),
                            uuid:gen_uuid,
                        }
                        return ForgetPassword.findOneAndUpdate({name: data[0].name}, update_id).then(() => {
                            sendMalil(sendMaliParms.email, "password reset request", "password reset request", sendMaliParms);
                            return {
                                respondCode:200,
                                statusCode:serverRespondCode().user_password_reset_sucess,
                                message:'email send'
                            }
                        }).catch((err) => {
                            return {
                                respondCode:400,
                                statusCode:serverRespondCode().forget_password_query_error,
                                message:'query error'
                            }
                        })
                    }else{
                        return Forget_password.save().then(() => {
                            sendMalil(sendMaliParms.email, "password reset request", "password reset request", sendMaliParms);
                            return {
                                respondCode:200,
                                statusCode:serverRespondCode().user_password_reset_sucess,
                                message:'email send'
                            }
                        }).catch((err) => {
                            return {
                                respondCode:400,
                                statusCode:serverRespondCode().forget_password_query_error,
                                message:'query error'
                            }
                        })
                    }
                });
            }else{
                return {
                    respondCode:400,
                    statusCode:serverRespondCode().forget_password_name_not_exist,
                    message:'user name or email not exsisit'
                }
            }
        }).catch((error) => {
            return {
                respondCode:400,
                statusCode:serverRespondCode().forget_password_query_error,
                message:'query error'
            }
        })
    }catch(err){
        return {
            respondCode:400,
            statusCode:serverRespondCode().forget_password_query_error,
            message:'query error'
        }
    }
}

exports.forget_password_check_token_validate = async(request) => {
    try{
        return await ForgetPassword.find({uuid: request.token, validate : true}).then((data) => {
            if(data.length != 0){
                return {
                    data:data[0],
                    respondCode:200,
                    statusCode:serverRespondCode().user_password_reset_tokan_valide,
                    message:'tokan valide'
                } 
            }else{
                return {
                    respondCode:400,
                    statusCode:serverRespondCode().password_reset_tokan_id_not_valide,
                    message:'tokan invalide'
                } 
            }
        })
    }catch(err){
        return {
            respondCode:400,
            statusCode:serverRespondCode().forget_password_query_error,
            message:'query error'
        }
    }
}

exports.user_change_password = async(request) => {
    try{
        const salt = await bcrypt.genSalt(15);
        let password_change_payload = {
            password:await bcrypt.hash(request.password, salt),
        };
        let update_status = {
            status: false,
            validate:false,
        }
        return await ForgetPassword.find({uuid: request.token}).then((data) => {
            if(data.length != 0){
                return User.findOneAndUpdate({name: data[0].name}, password_change_payload).then(() => {
                    return ForgetPassword.findOneAndUpdate({uuid: request.token}, update_status).then(() =>{
                        return {
                            respondCode:200,
                            statusCode:serverRespondCode().user_password_reset_complete,
                            message:'password is change'
                        }
                    }).catch((err) => {
                        logger.info(err)
                        return {
                            respondCode:400,
                            statusCode:serverRespondCode().password_reset_queey_error,
                            message:'query error'
                        }
                    })
                }).catch((err) => {
                    logger.info(err)
                    return {
                        respondCode:400,
                        statusCode:serverRespondCode().password_reset_queey_error,
                        message:'query error'
                    }
                })
            }else{
                return {
                    respondCode:400,
                    statusCode:serverRespondCode().password_reset_tokan_id_not_valide,
                    message:'tokan invalide'
                } 
            }
        }).catch((err) => {
            logger.info(err)
            return {
                respondCode:400,
                statusCode:serverRespondCode().password_reset_queey_error,
                message:'tokan invalide'
            } 
        })
    }catch(err){
        logger.info(err)
        return {
            respondCode:400,
            statusCode:serverRespondCode().forget_password_query_error,
            message:'query error'
        }
    }
}

exports.user_logout= async(request) => {
    try{
        return await User.findOneAndUpdate({_id: request}, {userLogin: false}).then((data) => {
            return {
                respondCode:200,
                statusCode:serverRespondCode().user_log_out,
                message:'password is change'
            }
        })
    }catch(err){
        return {
            respondCode:400,
            statusCode:serverRespondCode().forget_password_query_error,
            message:'query error'
        }
    }
}