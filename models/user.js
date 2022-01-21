const Joi = require("joi");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        maxlength:255,
        required:true
    },

    lastname:{
        type:String,
        maxlength:255,
        required:true
    },
    email:{
        type:String,
        maxlength:255,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        maxlength:255,
        required:true
    }
})

const User = mongoose.model("User", userSchema);

function validateSchema(requestBody){

    const schema = Joi.object({
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(255).required()

    })

    return schema.validate(requestBody);
}

module.exports.userSchema = userSchema;
module.exports.User = User;