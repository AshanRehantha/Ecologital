const mongoose = require('mongoose');
const logger = require('../logger');
const mongo_string_connection = process.env.MONGO_URL;

mongoose.connection.on('error', (err) => {

});

async function mongoConnect() {
    await mongoose.connect(mongo_string_connection).then(() => {
       logger.info("mongo db connection sucess")
    }).catch(err => {
        logger.error(err)
    })
}
module.exports = {mongoConnect}