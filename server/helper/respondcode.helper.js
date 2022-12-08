function serverRespondCode(){
    const code = {
        //all sucess code
        'sucess_code':00,
        'user_password_reset_sucess':3101,
        'user_password_reset_tokan_valide':3102,
        'user_password_reset_complete': 3103,
        'user_log_out':3104,
        'customer_info_get_sucess':3105,
        'customer_info_update_sucess':3106,
        'customer_password_update_change_sucess':3107,
        'user_email_update_sucess':3108,
        'user_list_sucess':3109,

        //auth respond code 3200 to 
        'user_email_already_exsisit':3201,
        'user_name_already_exsisit':3202,
        'create_user_search_error':3003,
        'forget_password_name_not_exist':3004,
        'password_reset_tokan_id_not_valide':3005,
        'password_reset_queey_error':3006,
        'old_password_not_match':3007,

        //query error 4100 to
        'forget_password_query_error':4100,
        'customer_info_query_error':4101,
        'customer_password_update_error':4102,
        'admin_users_list_error':4103,
        'admin_user_email_update_error':4104,
        'admin_users_query_error':4105

    }
    return code;
}

function errorRespondReturn(statuscode, message, error){
    return {
        statusCode:statuscode,
        respond:{
            'message':message == null ? "We are sorry, things don’t appear to be working at the moment. Please try again later." : message,
            'error':error,
        }
    }
}

function respondRequest(statusCode, message, data){
    return{
        statusCode:statusCode,
        respond:{
            'status':{
                'message': message,
                'statusCode':statusCode,
            },
            'data':data == undefined ? '' : data
        }
    }
}

module.exports = {
    serverRespondCode,
    errorRespondReturn,
    respondRequest,
}