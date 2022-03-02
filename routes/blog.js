const express = require("express");
const router = express.Router();
const {Blog, validateSchema} = require("../models/blog")
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/objectId")


router.post('/', validate(validateSchema), async(req, res)=>{

    let blog = new Blog({
        title:req.body.title,
        postBy:req.body.postBy,
        image:req.body.image,
        duration:req.body.duration,
        blogPost:req.body.blogPost
    })
   
    blog = await blog.save();
  
    return res.send(blog);
   
})

router.put("/:id",[
    validate(validateSchema), 
    validateObjectId],
async(req, res)=>{

    const updatedBlog = await Blog.findOneAndUpdate({_id:req.params.id},
        {
            $set:{
            
            title:req.body.title,
            postBy:req.body.postBy,
            image:req.body.image,
            duration:req.body.duration,
            blogPost:req.body.blogPost

            }
        },
        {
            new:true
        }
    )

    return res.send(updatedBlog);

})

router.delete("/:id", validateObjectId, async(req, res)=>{

    const deletedBlog = await Blog.findOneAndDelete({_id:req.params.id});
    if(!deletedBlog) return res.status(404).json({"message":"Blog not found"})

    return res.send(deletedBlog);


})

router.get("/:id",validateObjectId, async(req, res)=>{

    const blog = await Blog.findOne({_id:req.params.id})
    if(!blog) return res.status(404).send("blog not found");

        return res.send(blog);
    })

module.exports = router;