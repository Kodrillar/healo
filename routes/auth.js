const express = require("express");
const router = express.Router();
const {User} = require("../models/user");
const Joi = require("joi");
const validate = require("../middleware/validate")
const bcrypt = require("bcrypt")

router.post("/", validate(validateRequestBody), async (req, res)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(404).json({"message":"user not found"});
    const verifyPassword = await bcrypt.compare(req.body.password, user.password);
    if(!verifyPassword) return res.status(400).json({"message":"Invalid passowrd"});
    const token  = user.produceToken()   
    res.header("x-auth-token", token).send(user);
})


function validateRequestBody(requestBody){
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required().max(255)
    })

    return schema.validate(requestBody);
}

module.exports = router;