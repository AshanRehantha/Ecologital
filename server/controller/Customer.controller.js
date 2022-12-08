const { getValue } = require("../app/service/redis.server")
const { getCashUserId } = require("../helper/auth.helper");
const { respondRequest } = require("../helper/respondcode.helper");
const logger = require("../logger");
const { customerInfo, customerUpdate, customerPasswordUpdate } = require("../repository/customer.repository");


async function getCustomerInfo (req, res) {
    logger.info("Processing Method `/customet/customer.controller ->getUserInfo`")
    try{
        let userId = await getCashUserId(req.cookies.uuid);
        await customerInfo(userId).then((result) => {
            if(result.data != null){
                const return_data = {
                    first_name: result.data.customer_first_name,
                    last_name: result.data.customer_last_name,
                    address: result.data.customer_address,
                    address_two: result.data.customer_address_two,
                    city: result.data.customer_city,
                    state: result.data.customer_state,
                    zip: result.data.customer_zip,
                    country: result.data.customer_country
                }
                return res.status(result.respondCode).send({
                    data:respondRequest(result.statusCode, result.message, return_data)
                })
            }else{
                return res.status(400).send({
                    data:errorRespondReturn(4000, null, "")
                });
            }
        })

    }catch(error){
        logger.info(err);
        return res.status(400).send({
            data:errorRespondReturn(4000, null, err)
        });
    }
}

async function updatUserInfo (req, res){
    logger.info("Processing Method `/customet/customer.controller ->updateUserInfo`");
    try{
        let userId = await getCashUserId(req.cookies.uuid);
        await customerUpdate(req.body, userId).then((result) => {
            return res.status(result.respondCode).send({
                data:respondRequest(result.statusCode, result.message, undefined)
            })
        }).catch((err) => {
            return res.status(400).send({
                data:errorRespondReturn(4000, null, "")
            });
        })
    }catch(err){
        logger.info(err);
        return res.status(400).send({
            data:errorRespondReturn(4000, null, err)
        });
    }
}

async function updatePassword (req, res) {
    logger.info("Processing Method `/customet/customer.controller ->change Password`");
    try {
        await customerPasswordUpdate(req).then((result) => {
            return res.status(result.respondCode).send({
                data:respondRequest(result.statusCode, result.message, undefined)
            })
        }).catch((err) => {
            return res.status(400).send({
                data:errorRespondReturn(4000, null, "")
            });
        })
    }catch(err){
        logger.info(err);
        return res.status(400).send({
            data:errorRespondReturn(4000, null, err)
        });
    }
}


module.exports = {
    getCustomerInfo,
    updatUserInfo,
    updatePassword
}