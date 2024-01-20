const jwt=require('jsonwebtoken')
require('dotenv').config()
const user=require('../models/registerUser')


const authRequired= async (req,res,next)=>{

    const {authorization} =req.headers
// console.log(authorization,"done",req.headers);
    if(!authorization)
    return res.status(401).json({error:"Token Required"})

    const token=authorization.split(' ')[1]
    console.log(token);
    try {
       const ID =jwt.verify(token,process.env.SECRET_KEY)
        req.userID= await user.findOne({_id:ID.id}).select('_id')
        next();
    } catch (error) {
        console.log(error.message);
     res.status(401).json({error:"Request is not autorized"})
    }

};

module.exports=authRequired