const redis = require('redis');
const logger = require('../../logger');

const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_PORT;
const redis_password = process.env.REDIS_PASSWORD;
const redis_ttl = process.env.REDIS_TTL;

const client = redis.createClient({
    socket:{
        host:redis_host,
        port:redis_port,
    },
    password:redis_password,
});


client.connect().then(() => {
    logger.info("redis connection sucess");
}).catch((err) => {
    console.log(err);
})


async function saveWithTTL(key, value, ttlSecound = 60){
    await client.set(key, value);
}

async function getValue(key){
    return await client.get(key).then((data) => {
        return data
    })
}



module.exports = {
    saveWithTTL,
    getValue,
}