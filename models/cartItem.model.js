const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String
  },
  product: {   // استخدم اسم حقل قياسي وصغير
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: [true, 'Product reference is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity cannot be less than 1'],
  },
  priceOnepice: {
    type: Number,
    required: [true, 'Price is required'],
  },
  priceAll: {
    type: Number,
    required: [true, 'Price is required'],
  },
  pricetotalAll:Number,
  allquantity:Number,
  allprice:Number,
  email: String
}, { timestamps: true }); // هذا الخيار الصحيح

const CartItems = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItems;