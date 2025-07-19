const slugify = require('slugify');
const { check, body } = require('express-validator');
const Category=require("../../models/CategoryModel")
const subcategory=require("../../models/subcategoryModel")

const prdutcs=require("../../models/proudctsModel")

const validetoorerrors=require("../../middelweres/validetorError")

exports.createProductValidatorErrors = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('Product required')
    .custom(async (val, { req }) => {
const name= await prdutcs.findOne({title : val })
if(name){
  return  Promise.reject( new Error(`the name is found of list products : ${val}`));
}
req.body.slug = slugify(val);


}),body("title").custom((val,{req})=>{
  req.body.slug = slugify(val) 
  return true
}), check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Too long description'),
  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32 })
    .withMessage('To long price'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),

  check('colors')
    .notEmpty().withMessage("please must be adding colors")
    .isArray()
    .withMessage('availableColors should be array of string'),
  check('imageCover').notEmpty().withMessage('Product imageCover is required'),
  check('images')
    .optional()
    .isArray()
    .withMessage('images should be array of string'),
  check('category')
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((categoryId) =>{
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
      return true
    }
    
    
    ),check('subCategory')
    .optional()
    .custom(async (subcategoryids) => {
      // تأكد أنها مصفوفة
      const ids = Array.isArray(subcategoryids) ? subcategoryids : [subcategoryids];
  
      // أحضر كل الـ IDs الصحيحة
      const result = await subcategory.find();
      const Arrayofsubcategoryid = result.map((doc) => doc._id.toString());
  
      // تحقق من كل ID هل موجود؟
      // eslint-disable-next-line no-restricted-syntax
      for (const id of ids) {

        if (!Arrayofsubcategoryid.includes(id)) {
          return Promise.reject(
            new Error(`No subcaegory for this id: ${id}`)
          );
        }
      }
      return true;

    }).custom(async(value, {req} ) =>{
      const ids = Array.isArray(value) ? value : [value];
     
      const categoryIds=await subcategory.find({category:req.body.category})
      
      const Arrayofsubcategoryid = categoryIds.map((doc) => doc._id.toString());
      // eslint-disable-next-line no-restricted-syntax
      for (const id of ids) {
       
        if (!Arrayofsubcategoryid.includes(id)) {
          return Promise.reject(
            new Error(`ids no include category : ${id}`)
          );
        }
      }
      return true;
    }


    ),check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
      check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),check("Brand").optional(),
validetoorerrors];

exports.getProductValidatorErrors = [
  check('id').isMongoId().withMessage('Invalid ID formate')];

exports.updateProductValidatorErrors = [
  check('id').isMongoId().withMessage('Invalid ID formate')
  ,body("title").custom((val, {req})=>{
    req.body.slug = slugify(val) 
return true
  }),

  validetoorerrors];

exports.deleteProductValidatorErrors = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
 
  validetoorerrors];
  
  exports.uploadimge=check(`ids`).isMongoId().withMessage("invaled id ")