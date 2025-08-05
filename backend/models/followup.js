const mongoose = require("mongoose")

const followUpSchema = new mongoose.Schema({
    lead : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Leads',
        required : true
    },
    note : String,
    nextFollowUpDate : Date,
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("FollowUps", followUpSchema); 