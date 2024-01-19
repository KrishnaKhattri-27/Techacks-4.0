const express=require('express')
// const routes=require('./routes/userRoutes')
const cors=require('cors')
require('dotenv').config()
const app=express()
app.use(cors());


const port=process.env.PORT


app.use(express.json())

// app.use('/user',routes)


app.listen(port,()=>{
    console.log(`server started at ${port}`);
})

app.get("/",(req,res)=>{
res.send("<h1>krishna</h1>")
})

//connect to databse
const dbconnect=require("./config/database")
dbconnect();

