const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name : { type : String, required : true, minlength : 2, maxlength : 50},
    email : { type : String, required : true, minlength : 5, maxlength : 50, unique : true },
    password : { type : String, required : true, minlength : 5, maxlength : 1024 },
    age : { type : Number, required : true, min : 10, max : 60 },
    weight : { type : Number, required : true  },
    height : { type : Number, required : true  },
    phone : { type : String, required : true, minlength : 10, unique : true },
    R_date : { type : Date, default : Date.now },
    isAdmin : {type : Boolean, default : false}
});
userSchema.methods.generateAuthtoken = function(){
   const token = jwt.sign({_id : this._id}, config.get('jwtPrivateKey'),{ expiresIn: '7d'});
    return token;
}

const User = mongoose.model('User', userSchema);

function validate(user) {
    const schema = Joi.object({
        name : Joi.string().min(2).max(50).required(),
        email : Joi.string().min(5).max(50).required().email(),
        password : Joi.string().min(5).max(1024).required(),
        age : Joi.number().min(10).max(70).required(),
        weight : Joi.number().required(),
        height : Joi.number().required(),
        phone : Joi.number().required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validate;