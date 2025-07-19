

const synchandler=require("express-async-handler")
const sharp=require("sharp")
const { v4: uuidv4 } = require('uuid');
const SubcategorySechmaModel=require("../models/subcategoryModel")
const factory=require("./handlersFactory")
const uploadSingleImage =require("../middelweres/uploadStringimg")






exports.uploadSubcategoryImages = uploadSingleImage.uploadSingleImage('image');
// Image processing
exports.resizeImage = synchandler(async (req, res, next) => {
  const filename = `Subcategory-${uuidv4()}-${Date.now()}.jpeg`;
  if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/Subcategory/${filename}`);
  // Save image into our db 
req.body.image = filename;
  }
  next()
});


exports.creatcaregroyfromsubcategory=((req,res,next)=>{
      // Nested route (Create)
    if(!req.body.category)  req.body.category= req.params.categoryid
    next();
})

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.filterobject=((req,res,next)=>{
        let filtercatgory={}    
        if(req.params.categoryid)filtercatgory={category:req.params.categoryid}
        req.filterobj=filtercatgory
        next();
    })

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private

exports.CreatsubCategoryes=factory.creatOne(SubcategorySechmaModel)

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getsubCategoryes=factory.getAll(SubcategorySechmaModel)
    
// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getsubCategory=factory.getOne(SubcategorySechmaModel)
    
// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private

exports.updatesubcategory=factory.updateOne(SubcategorySechmaModel)

 // @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.Deletesubcategory=factory.DeleteOne(SubcategorySechmaModel)

    