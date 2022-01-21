const Joi = require("joi");
const mongoose = require("mongoose");
const {Blog} = require("../models/blog");


const suggestionSchema = new mongoose.Schema({
    
    suggestion:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Blog
}

})

const Suggestion = mongoose.model("Suggestion", suggestionSchema);


module.exports.suggestionSchema = suggestionSchema;
module.exports.Suggestion = Suggestion;