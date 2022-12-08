const { getCashUserId } = require("../helper/auth.helper")
const { serverRespondCode } = require("../helper/respondcode.helper")
const { User } = require("../models/user.models");
const bcrypt = require('bcrypt');
const logger = require("../logger");

async function customerInfo (token){
    try {
        return await User.find({_id: token }).then((data) => {
            if(data.length != 0) {
                return {
                    data:data[0],
                    respondCode:200,
                    statusCode:serverRespondCode().customer_info_get_sucess,
                    message:''
                } 
            }else{
                return {
                    data:null,
                    respondCode:200,
                    statusCode:serverRespondCode().customer_info_get_sucess,
                    message:''
                } 
            }
        })
    }catch(err){
        return {
            respondCode:400,
            statusCode:serverRespondCode().customer_info_query_error,
            message:'query error'
        }
    }
}

async function customerUpdate (req, token) {
    try {
        const update_data = {
            customer_first_name:req.firstname,
            customer_last_name:req.lastname,
            customer_address:req.address,
            customer_address_two:req.addres_line,
            customer_city:req.city,
            customer_state:req.state,
            customer_zip:req.zip,
            customer_country:req.country,
        }
        return await User.findByIdAndUpdate({_id: token}, update_data).then((result) => {
            return {
                respondCode:200,
                statusCode:serverRespondCode().customer_info_update_sucess,
                message:'user info updated'
            }
        }).catch((err) => {
            console.log(err);
            return {
                respondCode:400,
                statusCode:serverRespondCode().customer_info_query_error,
                message:'query error'
            }
        })
    }catch(err){
        console.log(err);
        return {
            respondCode:400,
            statusCode:serverRespondCode().customer_info_query_error,
            message:'query error'
        }
    }
}

async function customerPasswordUpdate (req) {
    let userId = await getCashUserId(req.cookies.uuid);
    const salt = await bcrypt.genSalt(15);
    const newPassword = await bcrypt.hash(req.body.new_password, salt);
    try {
        const oldPassword  = await User.find({_id: userId}).select('password');
        return bcrypt.compare(req.body.old_password, oldPassword[0].password).then((doMatch) => {
            if(doMatch){
                return User.findOneAndUpdate({_id: userId}, {password: newPassword}).then((result) => {
                    return {
                        respondCode:200,
                        statusCode:serverRespondCode().customer_password_update_change_sucess,
                        message:'password update sucess'
                    }
                }).catch((err) => {
                    logger.error(err)
                    return {
                        respondCode:400,
                        statusCode:serverRespondCode().customer_password_update_error,
                        message:'query error'
                    }
                })
            }else{
                return {
                    respondCode:400,
                    statusCode:serverRespondCode().old_password_not_match,
                    message:'old password not match'
                }
            }
        }).catch((err) => {
            return {
                respondCode:400,
                statusCode:serverRespondCode().customer_password_update_error,
                message:'query error'
            }
        })
    }catch(err){
        console.log(err);
        return {
            respondCode:400,
            statusCode:serverRespondCode().customer_password_update_error,
            message:'query error'
        }
    }
}


module.exports = {
    customerInfo,
    customerUpdate,
    customerPasswordUpdate
}