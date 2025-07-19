const { check, body } = require('express-validator');
const slugify=require("slugify")
const synchandler=require("express-async-handler")
// eslint-disable-next-line import/no-extraneous-dependencies
const bycrpt=require("bcryptjs")
const User=require("../../models/userModel")



exports.singvalidator=[check(`name`).notEmpty().withMessage(`Name is required`)
    .isLength({min:3})
    .withMessage(`tooo shooort category name`)
    .isLength({max:32})
    .withMessage(`to long category name`)
    ,body("name").custom((val, {req})=>{
        req.body.slug = slugify(val) 
    return true
      }),check("password")
      .notEmpty()
      .withMessage("pass is require")
      .isLength({min:6})
      .withMessage("password must be at least 6 characters").custom((value,{req})=>{
        if(value!==req.body.passwordConfirm)
        {
            throw new Error("password confirm incorrect")
        }else{
            return  true
        }
      }),check("passwordConfirm").notEmpty().withMessage("password confirm is require")
      
            ,check("emil").notEmpty()
            .withMessage("email is require ")
            .isEmail().withMessage("invalid Email")
            .custom(synchandler(async(Email)=>{
            const user= await User.findOne({emil:Email})
            if(user){
              return Promise.reject(new Error("Email already used"))
            }
              }))
            , 
            check("role").optional()
            ,check("profileImg").optional()
            ,check("phone").isMobilePhone(['ar-EG','ar-SA'])
            .withMessage("invalid number")
      ]
exports.loginvalidator=[check("password")
    .notEmpty()
    .withMessage("pass is require")
    .isLength({min:6})
    .withMessage("password must be at least 6 characters") ,check("emil").notEmpty()
    .withMessage("email is require ")
    .isEmail().withMessage("invalid Email")
]