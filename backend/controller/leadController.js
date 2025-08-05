const Lead = require("../models/lead")

exports.createLead = async(req,res) =>{
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json(lead)
    } catch (e) {
        res.status(400).json({error : e.message});
    }
}

exports.getLeads = async(req,res)=>{
    try {
        const leads = await Lead.find().sort({createdAt : -1});
        res.json(leads);
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

exports.deleteLead = async (req, res) => {
    try {
        const deletedLead = await Lead.findByIdAndDelete(req.params.id);
        if (!deletedLead) return res.status(404).json({ error: "Lead not found" });
        res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
