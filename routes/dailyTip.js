const express = require("express")
const router = express.Router();
const validateRequestBody = require("../middleware/validate");
const validateObjectId = require("../middleware/objectId")
const {validateSchema, DailyTip} = require("../models/dailyTip")


router.post("/", validateRequestBody(validateSchema), async(req, res)=>{

    let dailyTip = new DailyTip({
        image: req.body.image,
        title:req.body.title
    })

    dailyTip = await dailyTip.save()

    res.send(dailyTip);

})

router.get("/:id", validateObjectId, async(req, res)=>{

    const dailyTip = await DailyTip.findById(req.params.id);
    if(!dailyTip) return res.status(404).json({"message": "dailyTip not found"});
    res.send(dailyTip)

})

router.put("/:id",[
    validateRequestBody(validateSchema), 
    validateObjectId
], async(req, res)=>{
    
    const updatedDailyTip = await DailyTip.findByIdAndUpdate({_id:req.params.id}, 
        {
            $set:{
                image:req.body.image,
                title:req.body.title

            }
        }, 
        {
            new:true
        
        }
    ) 

    if(!updatedDailyTip) return res.status(404).json({"message":"dailyTip not found"});

    res.send(updatedDailyTip);
})


router.delete("/:id", validateObjectId, async(req, res)=>{

    const deletedDailyTip = await DailyTip.findOneAndDelete({_id:req.params.id});
    if(!deletedDailyTip) return res.status(404).json({"message":"dailyTip not found"});
    res.send(deletedDailyTip);
})
module.exports = router;