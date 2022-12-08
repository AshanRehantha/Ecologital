const jwt = require('jsonwebtoken');
const { getValue } = require("../app/service/redis.server")

const tokanPrivateKey = process.env.JWT_SECRET_KEY;

function createJwtToken (userId) {
    return jwt.sign({
       data:userId,
    }, tokanPrivateKey);
}

function veryfyJWTToken(token) {
    try {
       const decode = jwt.verify(token, tokanPrivateKey);
       return true;
    }catch(err){
        return false;
    }
}

async function getCashUserId(uuid) {
    let userId = await getValue(uuid);
    return userId;
}

module.exports = {
    veryfyJWTToken,
    createJwtToken,
    getCashUserId,
}