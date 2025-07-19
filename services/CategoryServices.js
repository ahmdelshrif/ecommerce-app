const synchandler=require("express-async-handler")
const sharp=require("sharp")
const { v4: uuidv4 } = require('uuid');
const SechmaModel=require("../models/CategoryModel")
const factory=require("./handlersFactory")
const uploadSingleImage =require("../middelweres/uploadStringimg")




exports.uploadBrandImages = uploadSingleImage.uploadSingleImage('image');
// Image processing
exports.resizeImage = synchandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  console.log(req.file.originalname)

  if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/categoryes/${filename}`);
  // Save image into our db 
req.body.image = filename;

  }
  next()
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.CreatCategoryes=factory.creatOne(SechmaModel)


// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategoryes=factory.getAll(SechmaModel)


// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory=factory.getOne(SechmaModel)

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updatecategory=factory.updateOne(SechmaModel)

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.Deletecategory=factory.DeleteOne(SechmaModel)

