const mongoose = require("mongoose")
const Joi = require("joi");



const dailyTipSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        maxlength:55,
        required:true
    }
})


const DailyTip = mongoose.model("dailytip", dailyTipSchema)

function validateSchema(requestBody){

    const schema = Joi.object({
        image:Joi.string().required(),
        title:Joi.string().max(55).required()
    })

    return schema.validate(requestBody);
}

module.exports.dailyTipSchema = dailyTipSchema;
module.exports.DailyTip = DailyTip;