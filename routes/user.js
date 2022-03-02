const { application } = require("express");
const express = require("express")
const router = express.Router();
const {User, validateSchema} = require("../models/user");
const validateRequestBody = require("../middleware/validate");
const bcrypt = require("bcrypt")


router.post("/", validateRequestBody(validateSchema), async (req, res)=>{

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).json({"message":"User already exist"});

    user = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    })

    const salt = await bcrypt.genSalt(10)
    const hashedPassowrd = await bcrypt.hash(user.password, salt);
    user.password = hashedPassowrd;
    user = await user.save();
    res.send(user);

})
module.exports = router;