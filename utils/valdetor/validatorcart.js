const { check, param } = require('express-validator');
const validatorMiddleware = require('../../middelweres/validetorError');
const cartitems=require("../../models/cartItem.model")


exports.addCartValidator = [
  check('product')
    .notEmpty().withMessage('productId must be an integer')
    .notEmpty().withMessage('productId is required')
  ,
  check('quantity')
    .isInt({ min: 1 }).withMessage('quantity must be at least 1'),
  validatorMiddleware,
];

exports.updateCartValidator = [
  check('quantity')
    .isInt({ min: 1 }).withMessage('quantity must be at least 1'),
  validatorMiddleware,
];

exports.idValidator = [
  param('itemId')
    .notEmpty().withMessage('Invalid cart item ID format').custom(async(val)=>{
const cartitem=await cartitems.findOne({_id:val})
if(!cartitem){
  return Promise.reject(
    new Error(`ids no prooduct : ${val}`)
  )}
  
    }),
  validatorMiddleware,
];
