const Joi = require("joi");
const mongoose = require("mongoose");


const guideSlideSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    
    guideText:{
        type:String,
        required:true,
        maxlength:255
    }
})

const GuideSlide = mongoose.model("guideSlide", guideSlideSchema)


function validateSchema(requestBody){
    const schema = Joi.object({
        image:Joi.string().required(),
        guideText:Joi.string().max(255).required()
    })

    return schema.validate(requestBody)
}

module.exports.guideSlideSchema = guideSlideSchema;
module.exports.GuideSlide = GuideSlide;