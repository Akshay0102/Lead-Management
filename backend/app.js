const express = require("express")
const connectDb = require("./config")
const cors = require("cors")
require('dotenv').config()

const app = express()
connectDb();

app.use(cors())
app.use(express.json())

app.use('/api/leads',require('./routes/leadroutes'));
app.use('/api/followUps',require('./routes/followupRoutes'));

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
