const asyncHandler = require('express-async-handler');
// eslint-disable-next-line import/no-unresolved
const CartItmes = require('../models/cartItem.model'); // افترض أنك تستخدم Prisma
const productes=require("../models/proudctsModel")
const ApiError=require("../utils/apiError")
// GET /api/cart
exports.getUserCart = asyncHandler(async (req, res, next) => {
  const email = req.User.emil;

  const cartItems = await CartItmes.find({ email }).populate({
    path: 'product',
    select: 'title price',
  });

  if (!cartItems.length) {
    return next(new ApiError('Cart is empty', 404));
  }
  let pricetotalall=0;
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for(const i in cartItems)
  {
    
    pricetotalall+=cartItems[i].priceAll

  }
  const payload = cartItems.map(item => ({
    id: item._id,
    product: {

      id: item.product._id,
      title : item.name
    },
    quantity: item.quantity,
    pricePerUnit: item.product.price,
    totalPrice: item.quantity * item.product.price,
  

  }));

  res.status(200).json({
    status: 'success',
    payload, pricetotalAll:pricetotalall
  });
});


// POST /api/cart
exports.addItemToCart = asyncHandler(async (req, res, next) => {
  const { product, quantity } = req.body;
  const email = req.User.emil;

  const productDoc = await productes.findById(product);
  if (!productDoc) {
    return next(new ApiError('Product not found', 404));
  }

  // 1) دور هل المنتج ده موجود عند المستخدم؟
  const existingItem = await CartItmes.findOne({ 
    product: productDoc._id, 
  });

  if (existingItem) {
    // لو موجود → زود الكمية
    existingItem.quantity += quantity;
    await existingItem.save();
    return res.status(200).json({
      status: 'success',
      payload: existingItem,
      message: 'Updated quantity for existing product in cart',
    });
  }

  // 2) لو مش موجود → ضيفه للكارت
  const newItem = await CartItmes.create({
    product: productDoc._id,
    name :productDoc.title,
    quantity,
    priceOnepice: productDoc.price,
    priceAll: productDoc.price * quantity,
    email,
    createdAt: Date.now(),
  });

  res.status(201).json({
    status: 'success',
    payload: newItem,
    message: 'Product added to cart successfully',
  });
});

 
// PATCH /api/cart/:itemId
// PATCH /api/cart/:itemId
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const email = req.User.emil;

  if (!quantity || quantity < 1) {
    return next(new ApiError('Quantity must be at least 1', 400));
  }

  const updatedItem = await CartItmes.findOneAndUpdate(
    { _id: itemId, email }, // نتأكد إن المنتج للمستخدم نفسه
    { quantity },
    { new: true }
  ).populate({
    path: 'product',
    select: 'title price',
  });

  if (!updatedItem) {
    return next(new ApiError('Cart item not found', 404));
  }

  res.status(200).json({
    status: 'success',
    payload: updatedItem,
    message: 'Updated cart item quantity',
  });
});

// DELETE /api/cart/:itemId
// DELETE /api/cart/:itemId
exports.removeCartItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const email = req.User.emil;

  const deletedItem = await CartItmes.findOneAndDelete({
    _id: itemId,
    email,
  });

  if (!deletedItem) {
    return next(new ApiError('Cart item not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Removed item from cart successfully',
  });
});
