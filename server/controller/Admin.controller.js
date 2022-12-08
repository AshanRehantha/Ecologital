"use strict";

const { usersListRepository, userEmailUpdateRepository } = require("../repository/admin.repository");
const logger = require("../logger");
const { respondRequest } = require("../helper/respondcode.helper");

async function userslist (req, res) {
    logger.info("Processing Method `/admin/admin.controller ->getUsersList`")
    await usersListRepository(req.body).then((result) => {
        return res.status(result.respondCode).send({
            data:respondRequest(
                result.statusCode, 
                result.message,
                result.data.map(function(item){
                    return {
                        email:item.email,
                        first_name: item.customer_first_name,
                        last_name: item.customer_last_name,
                        address: item.customer_address,
                        address_two: item.customer_address_two,
                        city: item.customer_city,
                        state: item.customer_state,
                        zip: item.customer_zip,
                        country: item.customer_country

                    }
                })
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

async function usersemailUpdate (req, res){
    logger.info("Processing Method `/admin/admin.controller ->userEmailUpdate`")
    await userEmailUpdateRepository(req.body).then((result) => {
        return res.status(result.respondCode).send({
            data:respondRequest(
                result.statusCode, 
                result.message,
                result.data.map(function(item){
                    return {
                        email:item.email,
                        first_name: item.customer_first_name,
                        last_name: item.customer_last_name,
                        address: item.customer_address,
                        address_two: item.customer_address_two,
                        city: item.customer_city,
                        state: item.customer_state,
                        zip: item.customer_zip,
                        country: item.customer_country

                    }
                })
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


module.exports = {
    userslist,
    usersemailUpdate
}