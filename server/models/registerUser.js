// const mongoose  = require("mongoose");
// const bcrypt=require('bcrypt')

// const registerUser=mongoose.Schema(
//     {
//         username:{
//             type:String,
//             required:true,
//             unique:true
//         },
//         password:{
//             type:String,
//             required:true,
//         }
//     }
// );

// // //stastic signup method
// // registerUser.statics.signup = async function(userData){
// //     const exists=await this.findOne({username:userData.username})
    
// //     if(exists)
// //     throw Error("username already in use")

// //     const salt=await bcrypt.genSalt(10)
// //     const hash = await bcrypt.hash(userData.password,salt)

// //     const response= await this.create({
// //         username:userData.username,
// //         gender:userData.gender,
// //         hearAbout:userData.hearAbout,
// //         city:userData.city,
// //         state:userData.state,
// //         name:userData.name,
// //         phone:userData.phone,
// //         password:hash,

// //     })

// //     return response;

// // };


// //static log-in method
// registerUser.statics.login = async function(username,password){
    
     
//     if(!username || !password)
//     throw Error("username already in use")

//     const user=await this.findOne({username})

//     if(!user)
//     throw Error("username not exists. Please register first")

//     const match=await bcrypt.compare(password,user.password)

//     if(!match)
//     throw Error("Incoreect Password")

//     return user
// };


// module.exports=mongoose.model('user',registerUser);