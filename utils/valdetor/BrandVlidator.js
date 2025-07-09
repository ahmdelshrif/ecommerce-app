const { check, body } = require('express-validator');

const slugify=require("slugify")

exports.getBrandvalidator=check(`id`).isMongoId().withMessage("invaled id ")

exports.creatBrandErrors=[check(`name`).notEmpty().withMessage(`name required`).isLength({min:3})
    .withMessage(`tooo shooort name`)
    .isLength({max:32}).withMessage(`to long name`), body("name").custom((val, {req})=>{
        req.body.slug = slugify(val) 
    return true
      })
]

exports.updateOneBrandErrors=[check(`id`).isMongoId().withMessage("invaled id "),check(`name`).optional().isString().withMessage(`category required`).isLength({min:3})
    .withMessage(`tooo shooort category name`)
    .isLength({max:32}).withMessage(`to long category name`), body("name").optional().custom((val, {req})=>{
              req.body.slug = slugify(val) 
          return true
            })
]
exports.DeleteOneBrandErrors=[check(`id`).isMongoId().withMessage("invaled id ")]

exports.uploadimgeErrors=check(`ids`).isMongoId().withMessage("invaled id ")