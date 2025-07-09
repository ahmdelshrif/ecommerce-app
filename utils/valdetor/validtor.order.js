// const { check, body } = require('express-validator');
// const slugify = require('slugify');
// const products=require("../../models/proudctsModel")
// const validatorMiddleware = require('../../middelweres/validetorError');

// exports.careateordersValidator=[check(`product`).notEmpty().withMessage("Productsid requrid")
// .isMongoId().withMessage("invaled id ")
// .custom(async(val,req)=>{
//         const productes=await  products.findOne(val)
//           if(!productes){
//             throw new Error(`There is no id found ${val}`)
//           }
//      return true  
// }),
// , check('quantity')
// .isInt({ min: 1 }).withMessage('quantity must be at least 1').isNumeric().withMessage("quantity must be"),

// validatorMiddleware]

// // exports.subcreatcategoryErrors=[check(`name`).notEmpty().withMessage(`category required`).isLength({min:2})
// //     .withMessage(`tooo shooort category name`)
// //     .isLength({max:32}).withMessage(`to long category name`)
// //     ,check(`category`).notEmpty().withMessage("categooryid requrid").isMongoId()
// //     .custom(async (val,next)=>{
// //       const categories=await  category.findOne(val)
// //       if(!categories){
// //         throw new Error(`There is no id found ${val}`)
// //       }
// //       return true
// //     })
// //     .withMessage("invaled id "), body("name").custom((val, {req})=>{
// //       req.body.slug = slugify(val) 
// //   return true
// //     })
// // ]

// // exports.updateOnesubcategoryErrors=[check(`id`).isMongoId().withMessage("invaled id "),check(`name`).notEmpty().withMessage(`category required`).isLength({min:2})
// //     .withMessage(`tooo shooort category name`)
// //   // eslint-disable-next-line no-undef
// //   .isLength({max:32}).withMessage(`to long category name`),
// //   body("name").custom((val, {req})=>{
// //       req.body.slug = slugify(val) 
// //   return true
// //     })
// // ]
// // exports.DeleteOnesubcategoryErrors=[check(`id`).isMongoId().withMessage("invaled id ")]


// // //exports.getsubcategoryesforsubcategoryvalidator=check(`category`).isMongoId().withMessage("invaled id ")