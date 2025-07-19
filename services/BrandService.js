
 
const synchandler=require("express-async-handler")
const sharp=require("sharp")
const { v4: uuidv4 } = require('uuid');
const BrandModel=require("../models/BradnsModel")
const factory=require("./handlersFactory") 
const uploadSingleImage =require("../middelweres/uploadStringimg")



exports.uploadBrandImages = uploadSingleImage.uploadSingleImage('image');
// Image processing
exports.resizeImage = synchandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  if(req.file){
    await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);
  // Save image into our db 
req.body.image = filename;
  }
  next()
});

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.CreatBrands=factory.creatOne(BrandModel)

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands=factory.getAll(BrandModel)


// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand=factory.getOne(BrandModel)

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand=factory.updateOne(BrandModel)

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.DeleteBrand=factory.DeleteOne(BrandModel)


