const synchandler=require("express-async-handler")
const { v4: uuidv4 } = require('uuid');
const sharp=require("sharp")
const factory=require("./handlersFactory")
// eslint-disable-next-line import/no-extraneous-dependencies
const uploadSingleImage=require("../middelweres/uploadStringimg")
const product=require("../models/proudctsModel")


// eslint-disable-next-line node/no-unpublished-require, no-unused-vars
//Description : Creat product
//Access : Private
// ROUTER POST /api/v1/product




exports.uploadproductsImages = uploadSingleImage.uploadMixOfImages([{name:"images"}]);
// Image processing
exports.resizeImage = synchandler(async (req, res, next) => {
    if (req.files && req.files.images) {
      const imagesFilenames = [];
      await Promise.all(req.files.images.map(async (file) => {
        const filename = `products-${uuidv4()}-${Date.now()}.jpeg`;
  
        await sharp(file.buffer)
          .resize(600, 600)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${filename}`);
  
        imagesFilenames.push(filename);
      }));
  
      req.body.images = imagesFilenames;
    }
next()
  });
  


// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private

exports.creatOne= synchandler(async (req, res, next) => {
   const document = (await product.create(req.body))
 res.status(200).json({data:document})    
 }) 

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public

exports.getproducts=factory.getAll(product,"product")


// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getOneproduct=factory.getOne(product)

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private

exports.updateproduct=factory.updateOne(product)



// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.Deleteproduct=factory.DeleteOne(product)

