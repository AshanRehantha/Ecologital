const http = require('http');
const winston = require('winston');
const app = require('./app');
const { mongoConnect } = require('./db/mondo.db');

const server = http.createServer(app);
const api_port = process.env.API_PORT;


async function startServer(){
    await mongoConnect();
    server.listen(api_port, () => {
        //logger.info(`app start with ${api_port}`);
    });
}

startServer()