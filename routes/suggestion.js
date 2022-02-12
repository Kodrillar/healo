const express = require("express");
const router = express.Router()
const {Suggestion} = require("../models/suggestion")
const {Blog} = require("../models/blog");
const validateObjectId = require("../middleware/objectId")
const _ = require("lodash")

router.post("/:id", validateObjectId, async (req, res)=>{

    const blog = await Blog.findOne({_id:req.params.id})
    if(!blog) return res.status(404).send("blog not found");

    let suggestion = new Suggestion({
      suggestion:blog._id

    })

    suggestion = await suggestion.save();

    return res.send(suggestion);

})

router.get("/:id", validateObjectId, async (req, res)=>{

    const suggest = await Suggestion
        .findOne({suggestion:req.params.id})
        .populate("suggestion");
    if(!suggest) return res.status(404).send("suggestion not found");
    
    res.send(_.pick(suggest.suggestion, ["_id", "title","image","postBy"]));

})
module.exports = router;