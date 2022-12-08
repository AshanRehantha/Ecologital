const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const AuthRouter = require('./routers/auth/AuthRouter');
const CustomerRouter = require('./routers/customer/Customer.router');
const AdminRouter = require('./routers/admin/Admin.router');
//const User = require('./models/user.models');
//const ForgetPassword = require('./models/forget_password.model');
const sendRequestWithAuth = require('./app/service/web.service');

const api_prifix = process.env.API_PRFIX;

const whitelist = process.env.CORS_OPTIONS_ORIGIN;

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        }
    },
    credentials: true,
    exposedHeaders:['Set-Cookie'],
    methods:process.env.CORS_OPTIONS_METHODS
  }
app.use(cors(corsOptions));
app.use(sendRequestWithAuth);

//Routers
app.use(`${api_prifix}/auth`, AuthRouter);
app.use(`${api_prifix}/customer`,CustomerRouter)
app.use(`${api_prifix}/admin`, AdminRouter)

module.exports = app;