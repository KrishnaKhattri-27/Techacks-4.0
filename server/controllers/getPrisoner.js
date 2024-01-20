
const Prisoner=require('../models/PrisonerData')

const getPrisinor=(req,res)=>{
    const { name, photo, age, gender, history } = req.body;

    try {
      Prisoner.create({
        name: name,
        photo: photo,
        age: age,
        date: new Date(),
        gender: gender,
        history: history,
      });
  
      res.json({
        message: "Data of Prisoner received on the server",
      });
    } catch (err) {
      console.log("Failed To Create Schema", err);
      res.status(500).json({ error: "Failed to create schema" });
    }
}

module.exports=getPrisinor;