const nodemailer = require('nodemailer');
require("dotenv").config();

const mail=(req,res)=>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: { 
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
      });

    const response=req.body
    console.log("hello");
    const sub=response.sub
    const cont=response.cont
    console.log(sub,cont);


    const mailOptions = {
        from: 'krishnakhattri24@gmail.com',
        to: "dhruvchandak5@gmail.com",
        subject: sub,
        text: cont
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
            res.status(500).json({
                success: false,
                data: error.message,
                message: "error occured",
              });
          return console.error(`Error sending email: ${error.message}`);

        } else {
          console.log("ok");
            res.status(200).json({
                success: true,
                message: "mail sent",
              });
        }
       
      });

}

module.exports=mail;