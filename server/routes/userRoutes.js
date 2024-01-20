const notification=require("../controllers/notification")
const mail=require("../controllers/mail")
const express=require('express')
// const loginUser=require('../controller/loginUser')
// const authRequired=require('../middlewares/authRequired')
const router = express.Router();


// router.post('/login',loginUser)
// router.use(authRequired)

router.post('/sendNotification',notification)
router.post('/sendMail',mail)
router.post("/api/receiveImageChunk",)
// router.get("/getDetails",)

module.exports=router;