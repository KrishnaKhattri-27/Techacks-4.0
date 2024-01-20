// const notification=require("../controllers/notification")
// const mail=require("../controllers/mail")
const express=require('express')
const loginUser=require('../controllers/loginUser')
const authRequired=require('../middlewares/authRequired')
const getPrisinor=require('../controllers/getPrisoner')
const router = express.Router();

router.post("/api/recievePrisoner",getPrisinor)
router.post('/login',loginUser)
router.post('/sendMail',mail)
router.use(authRequired)

// router.post('/sendNotification',notification)
// router.post("/api/receiveImageChunk",)
// router.get("/getDetails",)

module.exports=router;