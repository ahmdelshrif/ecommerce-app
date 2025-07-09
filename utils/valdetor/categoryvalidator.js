const { check, body } = require('express-validator');
const slugify=require("slugify")

exports.getcategooryvalidatorErrors=check(`id`).isMongoId().withMessage("invaled id ")

exports.creatcategoryErrors=[check(`name`).notEmpty().withMessage(`category required`).isLength({min:3})
    .withMessage(`tooo shooort category name`)
    .isLength({max:32}).withMessage(`to long category name`),body("name").custom((val, {req})=>{
        req.body.slug = slugify(val) 
    return true
      })
]

exports.updateOnecategoryErrors=[check(`id`).isMongoId().withMessage("invaled id "),check(`name`).notEmpty().withMessage(`category required`).isLength({min:3})
    .withMessage(`tooo shooort category name`)
    .isLength({max:32}).withMessage(`to long category name`), body("name").custom((val, {req})=>{
          req.body.slug = slugify(val) 
      return true
        })
]
exports.DeleteOnecategoryErrors=[check(`id`).isMongoId().withMessage("invaled id ")]