"use strict";

const { User } = require("../models/user.models");
const { serverRespondCode } = require("../helper/respondcode.helper");

async function usersListRepository (){
    try {
        return await User.find({userType: 1}).then((data) => {
            if(data.length != 0) {
                return {
                    data:data,
                    respondCode:200,
                    statusCode:serverRespondCode().user_list_sucess,
                    message:''
                } 
            }else{
                return {
                    data:[],
                    respondCode:200,
                    statusCode:serverRespondCode().user_list_sucess,
                    message:''
                } 
            }
        })
    }catch(err){
        return {
            respondCode:400,
            statusCode:serverRespondCode().admin_users_query_error,
            message:'query error'
        }
    }
}


async function userEmailUpdateRepository (payload) {
    try{
        return await User.findOneAndUpdate({email: payload.oldemail}, {email: payload.email}).then((data) => {
            return User.find({userType: 1}).then((data) => {
                return {
                    data:data,
                    respondCode:200,
                    statusCode:serverRespondCode().user_email_update_sucess,
                    message:''
                }
             })
        })

    }catch(err){
        return {
            respondCode:400,
            statusCode:serverRespondCode().admin_users_query_error,
            message:'query error'
        }
    }
}

module.exports = {
    usersListRepository,
    userEmailUpdateRepository
}