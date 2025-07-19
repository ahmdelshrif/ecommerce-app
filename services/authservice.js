// eslint-disable-next-line import/no-extraneous-dependencies
const jwt=require("jsonwebtoken")
const synchandler=require("express-async-handler")
const bycrpt=require("bcryptjs")

const AsyncHandler = require("express-async-handler")

const crypto = require('crypto');
 // eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require("nodemailer");
const Jokertoken=require("../utils/create.token")
const ApiErorr=require("../utils/apiError")
const UserModel=require("../models/userModel")





exports.singup=synchandler(async(req,res,next)=>{
//creat user 
const user= await UserModel.create({
    name:req.body.name,
    emil:req.body.emil,
    password:req.body.password,
    phone:req.body.phone
})
//create token

const token=Jokertoken(user._id)
res.status(201).json({data:user, token})
})


exports.login=synchandler(async(req,res,next)=>{

// check email is exist and password or not 
const user=await UserModel.findOne({emil:req.body.emil})

if(!(user) || !(await bycrpt.compare(req.body.password,user.password)))
{
return next(new ApiErorr("password or email inncorect", 400 ))
}
const token=Jokertoken(user._id)
res.status(201).json({data:user,token})
})


exports.protect=(async(req,res,next)=>{

    //catch token
    let token      
    if(!req.headers.authorization &&!req.headers.authorization.startsWith('bearer') )//cear all samil char
    {
        return next(new ApiErorr("plase login ",400))

    }
    
        // eslint-disable-next-line prefer-const
        token=req.headers.authorization.split(" ")[1]
       console.log(token)
    
// verfiy token 
const decoded=jwt.verify(token, process.env.tokenSecret)

const user= await UserModel.findById(decoded.UserId)

if(user===null)
{
    return next(new ApiErorr("no user found ",400))
}
if(user.passwordcahnageAt)
{
    const  cahngepasswordat=user.passwordcahnageAt.getTime()/1000;
    if(decoded.iat<cahngepasswordat){
        return next(new ApiErorr("User recantly changed your password ",400))
    }
}
req.User=user
next();
})

exports.allowTO=(...roles)=>
    AsyncHandler(async(req,res,next)=>{

if(!roles.includes(req.User.role))
{
    return next(new ApiErorr("this User that not allow accesse this router",403))
}
    next()


    })

exports.forgetpassword=AsyncHandler(async(req,res,next)=>{
    //check email
const user=await UserModel.findOne({emil:req.body.emil})

if(!user){
    return next(new ApiErorr("there is not found this email",403))
}
//doing round num for send you and hass code , save db 
    const pasascode= Math.floor(100000 + Math.random() * 900000).toString()
const passcodehash = crypto.createHash('sha256')
  .update(pasascode)
  .digest('hex');
user.passcodehash=passcodehash
user.passcodexpir=Date.now()+10*60*1000
user.passwordRestvirfied=false
await user.save()
//send email 
const transport=nodemailer.createTransport({
    host:process.env.E_shop_Email_host,
    port:process.env.E_shop_Email_port,
    secure:process.env.E_shop_Email_secure, 
    auth:{
        user:process.env.E_shop_Email_auth_user,
        pass:process.env.E_shop_Email_auth_pass
    }

})

const  mailoptation={
    from:`E_Shop App <programing Ahmdbasher@gmail.com>`,
    to:user.emil,
    subject:"for forget password",
    text:`this this code for E_shop team to Raest Password olease take this code and using inccort place
    ${pasascode} thank you for using E_shop `

}
console.log(user)
await transport.sendMail(mailoptation)
res.status(200).json({status:"Success" , message:"rest code succssefully"})

})



exports.verfiedpassword=AsyncHandler(async(req,res,next)=>{
  const {restcode} = req.body

  const passcodehash = crypto.createHash('sha256')
  .update(restcode)
  .digest('hex');

  const user=await UserModel.findOne({passcodehash:passcodehash,passcodexpir:{$gte:Date.now()}})
  if(!user){
    return next(new ApiErorr("the code or expir code invalid ",403))
  }
  user.passwordRestvirfied=true
  await user.save()
  res.status(200).json({status:"Success" , message:"succssefully"})

})


exports.restpasswod=AsyncHandler(async(req,res,next)=>{

    const user=await UserModel.findOne({emil:req.body.email})
    if(!user){
        return next(new ApiErorr("the email or passwor inccoret ",403))
    }
    if(!user.passwordRestvirfied){
        return next(new ApiErorr("the email or password inccoret ",403))
    }
    user.password=req.body.newpassword
    user.passcodehash=null
    user.passcodexpir=null
    user.passwordRestvirfied=null
  await  user.save()
  const token=Jokertoken(user._id)
  res.status(201).json({data:user, token})
})






