const mongoose = require('mongoose');
const opts = { timestamps:true, toJSON: {virtuals: true}}

const ForgetPasswordSchema = mongoose.Schema({
    email: {
        require: true,
        type: String,
    },
    name:{
        require: true,
        type: String,
    },
    request_date: {
        require: true,
        type: Date,
        default: false,
    },
    update_date:{
        require: true,
        type: Date,
        default: false,
    },
    status:{
        type: Boolean,
        default: true,
    },
    validate:{
        type: Boolean,
        default: true,
    },
    uuid:{
        type:String,
        default: false,
        require: true,
    }
}, opts);

ForgetPasswordSchema.virtual('id').get(function(){
    return this._id.toHaxString();
});

exports.ForgetPassword = mongoose.model('forget_password', ForgetPasswordSchema);
exports.ForgetPasswordSchema = ForgetPasswordSchema;