
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('../middleware/CatchAsyncError');
const ApiFeatures = require('../utils/APIfeatures');


//Create Product -- Admin
exports.createProduct = CatchAsyncError(async (req, res) => {

   req.body.user = req.user.id;

   const product = await Product.create(req.body);

   res.status(200).json({
      success: true,
      product
   })
   // console.log(product)
});

// get All Products
exports.getAllProduct = CatchAsyncError(async (req, res) => {

   const resultPerPage = 5;
   const productCount = await Product.countDocuments()

   const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .SearchFeature()
      .FilterFeature()
      .Pagination(resultPerPage);
   const allProduct = await apiFeatures.query;

   res.status(200).json({
      success: true,
      allProduct,
      productCount
   })
});

// Update Product --Admin

exports.updateProduct = CatchAsyncError(async (req, res, next) => {

   let product = await Product.findById(req.params.id);

   if (!product) {
      return next(new ErrorHandler('Product not found', 404));
   }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
   })

   res.status(200).json({
      success: true,
      product
   })

});


// Delete Product

exports.deleteProduct = CatchAsyncError(async (req, res) => {

   const product = await Product.findByIdAndDelete(req.params.id);

   if (!product) {
      return next(new ErrorHandler('Product not found', 404));
   }

   res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully'
   })
});

// Get single product details
exports.getProductDetails = CatchAsyncError(async (req, res, next) => {

   const product = await Product.findById(req.params.id);

   if (!product) {
      return next(new ErrorHandler('Product not found', 404));
   }
   res.status(200).json({
      success: true,
      data: product
   })
});