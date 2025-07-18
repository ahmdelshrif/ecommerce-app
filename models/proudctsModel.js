const mongoose=require("mongoose")


const ProductsSchema= new  mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
      },
      description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Too short product description'],
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
      },
      sold: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
      },
      priceAfterDiscount: {
        type: Number,
      },
      colors: [String],
      size:[String],
      imageCover: {
        type: String,
        required: [true, 'Product Image cover is required'],
      },
        images: [String],
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'category',
            required: [true, 'Product must be belong to category'],
        },
        subCategory: [
            {
            type: mongoose.Schema.ObjectId,
          ref: 'subCategory',
        },
      ],
      Brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
      },
      ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
        // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
      },
      ratingsQuantity: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
      // to enable virtual populate
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

const ProoductSechmaModel=  mongoose.model("product",ProductsSchema)

module.exports=ProoductSechmaModel