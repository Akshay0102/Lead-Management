const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
    name : String,
    email : String,
    phone : String,
    source : String,
    status : {
        type: String,
        enum : ['New','Contacted','Qualified','Lost'],
        default : 'New'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Leads",leadSchema);