const express=require("express")
const validetoorerrors=require("../middelweres/validetorError")

const {
    singvalidator,loginvalidator
}=require("../utils/valdetor/authvalidator")

const {
    singup,login,forgetpassword,verfiedpassword,restpasswod
}=require("../services/authservice")



const router=express.Router()

router.route("/singup").post(singvalidator,validetoorerrors,singup)
router.route("/login").post(loginvalidator,validetoorerrors,login)
router.route("/forgetpassword").post(forgetpassword)
router.route("/verfiedpassword").post(verfiedpassword)
router.route("/restpasswod").put(restpasswod)
module.exports=router 



