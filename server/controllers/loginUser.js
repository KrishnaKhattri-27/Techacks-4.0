const user=require('../models/registerUser')
const jwt =require('jsonwebtoken')
require('dotenv').config()

const createToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'3d'})
}

const loginUser=async(req,res)=>{
    const data=req.body


    try {
        const response=await user.login(data.email,data.password)
        const token=createToken(response._id)
        res.status(200).json({
                success:true,
                data:{token:token,name:response.name},
                message:"entry created successfuly" 
        })    
    } catch (error) {
        res.status(400).json(
            {
                success:false,
                data:"server error",
                message:error.message
            }
        )
    }
}

module.exports=loginUser