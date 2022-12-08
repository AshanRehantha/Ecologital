const mongoose = require('mongoose');
const opts = { timestamps:true, toJSON: {virtuals: true}}

const UserSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        default: false,
    },
    email: {
        unique:true,
        require: true,
        type: String,
        default: false,
    },
    password: {
        require: true,
        type: String,
        default: false,
    },
    userType: {
        require: true,
        type: String,
        default: false,
    },
    resetPassword:{
        type:Boolean,
        default: false,
    },
    userLogin:{
        type:Boolean,
        default: false,
    },
    customer_first_name:{
        type:String,
    },
    customer_last_name:{
        type: String,
    },
    customer_address:{
        type: String,
    },
    customer_address_two:{
        type: String,
    },
    customer_city:{
        type: String,
    },
    customer_state:{
        type: String,
    },
    customer_zip:{
        type: String,
    },
    customer_country:{
        type: String,
    },
}, opts);

UserSchema.virtual('id').get(function(){
    return this._id.toHaxString();
});

exports.User = mongoose.model('User', UserSchema);
exports.UserSchema = UserSchema;