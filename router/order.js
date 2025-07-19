const express = require('express');
const { protect } = require('../services/authservice');
const {
  addItemToCart,
  updateCartItem,
  removeCartItem,
  getUserCart
// eslint-disable-next-line import/no-unresolved
} = require('../services/cartController');

// eslint-disable-next-line import/no-unresolved
const {addCartValidator ,updateCartValidator,idValidator} = require('../utils/valdetor/validatorcart');

const router = express.Router();

// كل المسارات محمية بـ protect للتحقق من JWT
router.use(protect);

router
  .route('/')
  .get(getUserCart) // عرض الكارت
  .post(addCartValidator, addItemToCart); // إضافة منتج

router
  .route('/:itemId')
  .put(idValidator, updateCartValidator, updateCartItem) // تعديل الكمية
  .delete(idValidator, removeCartItem); // حذف المنتج

module.exports = router;
