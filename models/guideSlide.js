const Joi = require("joi");
const mongoose = require("mongoose");


const guideSlideSchema = new mongoose.Schema({
        guideSlides:[ 
            {

                guide: {
                    image:{
                        type:String,
                        required:true
                    },
                        
                    guideText:{
                        type:String,
                        required:true,
                        maxlength:255
                    
                    }
                    
                }
            }
               
            
        ],
        createdAt:{
            type: Date,
            default: Date.now()
        }
        
    }
    
)

const GuideSlide = mongoose.model("guideSlide", guideSlideSchema)


function validateSchema(requestBody){
    const schema = Joi.object({
        image:Joi.string().required(),
        guideText:Joi.string().max(255).required()
    })

    return schema.validate(requestBody)
}

//module.exports.guideSlideSchema = guideSlideSchema;
module.exports.GuideSlide = GuideSlide;
module.exports.validateSchema = validateSchema;