const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb connected ");
    }
    catch(e){
        console.error("Mongodb connection failed ", e.message)
    }
}

module.exports = connectDb;