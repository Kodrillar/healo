const express = require("express");
const router = express.Router();
const {GuideSlide, validateSchema} = require("../models/guideSlide");
const validateRequestBody = require("../middleware/validate")
const validateObjectId = require("../middleware/objectId")
const mongoose = require("mongoose")



router.post("/", validateRequestBody(validateSchema), async (req, res)=>{

    let guideSlide = new GuideSlide({
        guideSlides:[
            {
                guide:{
                    image:req.body.image,
                    guideText:req.body.guideText
                }
            }
        ]
    })

    guideSlide = await guideSlide.save();

    res.send(guideSlide)



})

//to get complete 'guideSlides'
router.get("/:id", validateObjectId, async (req, res)=>{

    const guideSlide = await GuideSlide.findById(req.params.id);
    if(!guideSlide) return res.status(404).json({"message":"guideSlide not found"})

    res.send(guideSlide);
})

//to get a 'guide' inside 'guideSlides'

router.get("/", async(req, res)=>{

    // !mongoose.isValidObjectId(req.query.id) && res.status(400).json({"message":"Invalid Object Id"})

    if(!mongoose.isValidObjectId(req.query.id) || !mongoose.isValidObjectId(req.query.guideId))
    return res.status(400).json({"message":"Invalid Object Id"})
    
    const guideSlide = await GuideSlide.findById(req.query.id);
    if(!guideSlide) return res.status(404).json({"message":"guideSlide not found"})

    let guide = guideSlide.guideSlides.id(req.query.guideId);
    if(!guide) return res.status(404).json({"message":"guide not found"});

    res.send(guide);

})

//to update a guide inside 'guideSlides'

router.put("/", validateRequestBody(validateSchema), async(req,res)=>{

    if(!mongoose.isValidObjectId(req.query.id) || !mongoose.isValidObjectId(req.query.guideId))
    return res.status(400).json({"message":"Invalid Object Id"})
    
    let guideSlide = await GuideSlide.findById(req.query.id);
    if(!guideSlide) return res.status(404).json({"message":"guideSlide not found"})

    let GUIDE_TO_BE_UPDATED = guideSlide.guideSlides.id(req.query.guideId);
    if(!GUIDE_TO_BE_UPDATED) return res.status(404).json({"message":"guide not found"});

    GUIDE_TO_BE_UPDATED.set({
        guide:{
            image:req.body.image,
            guideText:req.body.guideText
        }
    
    });
   guideSlide = await guideSlide.save()
   res.send(guideSlide);
})

//to add a 'guide' inside 'guideSlides'
router.put("/:id",[
        validateRequestBody(validateSchema),
        validateObjectId
    ], async(req, res)=>{

    let guideSlide = await GuideSlide.findById(req.params.id);
    if(!guideSlide) return res.status(404).json({"message":"guideSlide not found"});

    const GUIDE_TO_BE_ADDED = {
        guide:{
            image:req.body.image,
            guideText:req.body.guideText,
        }
    };
    guideSlide.guideSlides.push(GUIDE_TO_BE_ADDED);
    guideSlide = await guideSlide.save()
    res.send(guideSlide)
})

//to delete a 'guide' inside a 'guideslide'
router.delete('/', async(req, res)=>{

    if(!mongoose.isValidObjectId(req.query.id) || !mongoose.isValidObjectId(req.query.guideId))
    return res.status(400).json({"message":"Invalid Id"});

    let guideSlide = await GuideSlide.findById(req.query.id);
    if(!guideSlide) return res.status(404).json({"message":"GuideSlide not found"});

    const GUIDE_TO_BE_DELETED  = guideSlide.guideSlides.id(req.query.guideId);
    if(!GUIDE_TO_BE_DELETED) return res.status(404).json({"message":"Guide not found"})

    GUIDE_TO_BE_DELETED.remove()
    guideSlide = await guideSlide.save()

    res.send(guideSlide);
})

//to delete complete 'guideSlides'

router.delete("/:id", validateObjectId, async(req, res)=>{

    const deletedGuideSlide = await GuideSlide.findOneAndDelete({_id:req.params.id});
    if(!deletedGuideSlide) return res.status(404).json({"message":"GuideSlide not found"});

    res.send(deletedGuideSlide)
})


module.exports = router