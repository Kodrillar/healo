const Joi = require("joi"), 
            mongoose = require("mongoose"),
            jwt = require("jsonwebtoken"),
            config = require("config")



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
});

userSchema.methods = {
    produceToken:function(){
        const token  = jwt.sign({_id:this._id, email:this.email}, config.get("jwtkey"));
        return token;
    }
}

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

module.exports.validateSchema = validateSchema;
module.exports.User = User;