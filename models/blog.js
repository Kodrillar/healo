const Joi = require("joi");
const mongoose = require("mongoose");



const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:1025
    },

    image:{
        type:String
    },
    
    postBy:{
         type:String,
        required:true,
         maxlength:25
    },
   duration:{
       type:Number,
       min:1,
       max:35
   },

   blogPost:{
       type:String,
       required:true,
       minlength:55
   }
})

const Blog = mongoose.model("Blog", blogSchema);

function validateSchema(requestBody){

    const schema = Joi.object({
        title: Joi.string().max(1025).required(),
        image: Joi.string().required(),
        postBy: Joi.string().max(25).required(),
        duration: Joi.number().min(1).max(35).required(),
        blogPost: Joi.string().min(55).required()
    })

    return schema.validate(requestBody);
}

module.exports.Blog = Blog;
module.exports.blogSchema = blogSchema;
module.exports.validateSchema = validateSchema;