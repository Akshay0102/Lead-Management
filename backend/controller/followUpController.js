const FollowUp = require("../models/followup")

exports.addFollowUp = async(req,res)=>{
    try {
        const followUp = await FollowUp.create(req.body);
        res.status(201).json(followUp)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

exports.getFollowUp = async(req,res)=>{
    try {
        const followUps = await FollowUp.find({lead : req.params.leadId})
        res.status(201).json(followUps)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

exports.deleteFollowUp = async (req,res)=>{
    try {
        const deleted = await FollowUp.findByIdAndDelete(req.params.followUpId);
        if(!deleted)  return res.status(404).json({ error: "Follow-up not found" });
        res.status(200).json({ message: "Follow-up deleted successfully" });
    } catch (error) {
        res.status(500).json({error :error.message});
    }
}
