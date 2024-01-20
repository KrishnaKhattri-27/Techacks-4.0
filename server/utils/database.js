const { error } = require("console");
const mongoose  = require("mongoose");

require('dotenv').config();

const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // serverSelectionTimeoutMS: 30000, // 30 seconds
        // socketTimeoutMS: 45000, // 45 seconds
    })
    .then(()=>{console.log("database connected");})
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    })
}

module.exports=dbconnect;