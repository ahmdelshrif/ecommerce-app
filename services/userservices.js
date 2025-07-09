const synchandler=require("express-async-handler")
const sharp=require("sharp")
const { v4: uuidv4 } = require('uuid');
 const bycrpt=require("bcryptjs")
const UserModel=require("../models/userModel")
const factory=require("./handlersFactory") 
const {uploadSingleImage }=require("../middelweres/uploadStringimg")
const Jokertoken=require("../utils/create.token")

exports.uploadUserImages = uploadSingleImage('profileImg');
// Image processing
exports.resizeImage = synchandler(async (req, res, next) => {
  const filename = `User-${uuidv4()}-${Date.now()}.jpeg`;
  if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 }) 
    .toFile(`uploads/User/${filename}`);
  // Save image into our db 
req.body.profileImg = filename;

  }  
  next();
});

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private/Admin
exports.CreatUser=factory.creatOne(UserModel)

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers=factory.getAll(UserModel)


// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser=factory.getOne(UserModel)

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser=factory.updateOne(UserModel)

exports.updatePasswordUser=factory.updatePassword(UserModel)

// @desc    Delete specific User
// @route   DELETE /api/v1/User/:id
// @access  Private/Admin
exports.deactivateuser=factory.deactivate(UserModel)

exports.DeleteUser=factory.DeleteOne(UserModel)


exports.getloggeduser=(synchandler(async(req,res,next)=>{
req.params.id=req.User._id
next()
  
}))

exports.upadapasswordteloggeduser=(synchandler(async(req,res,next)=>{
 const user=await UserModel.findByIdAndUpdate(
  req.User._id
  ,{
password :await bycrpt.hash(req.body.password,12),
 passwordcahnageAt:Date.now()
  }
  ,{new:true}
 )
 const token=Jokertoken(user._id)
 res.status(200).json({data : user, token})


}))

exports.upadateloggeduser=(synchandler(async(req,res,next)=>{
  const user=await UserModel.findByIdAndUpdate(
   req.User._id,
   {
    emil:req.body.email,
    phone:req.body.phone,
    name:req.body.name
   }
   ,{new:true}
  )

  res.status(200).json({data :user})
 
 
 }))
 exports.deleteloggeduser=(synchandler(async(req,res,next)=>{
  await UserModel.findByIdAndUpdate(
   req.User._id,
   {
    active:false
   }
   ,{new:true}
  )
  res.status(200).json({ status:'success',
    message: 'your account diactivate successfully',})
 
 
 }))
  