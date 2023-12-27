
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


// Create New Review And Update

exports.createProductReview = CatchAsyncError(async (req, res, next) => {


   const { rating, comment, productId } = req.body;
   const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
   }

   const product = await Product.findById(productId);

   const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

   if (isReviewed) {
      product.reviews.forEach((rev) => {
         if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment)
      })
   } else {
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length;
   }

   let avg = 0;

   product.reviews.forEach((rev) => {
      avg += rev.rating;
   })

   product.ratings = avg / product.reviews.length

   await product.save({ validateBeforeSave: false })

   res.status(200).json({
      success: true
   })
})


// Get All Reviews Of A Single Product

exports.getAllReviews = CatchAsyncError(async (req, res, next) => {

   const product = await Product.findById(req.query.id)
   if (!product) {
      return next(new ErrorHandler('Product Not Found', 404))
   }

   res.status(200).json({
      success: true,
      reviews: product.reviews,
   })
})

// Delete Review

exports.deleteReviews = CatchAsyncError(async (req, res, next) => {

   const product = await Product.findById(req.query.productId)

   if (!product) {
      return next(new ErrorHandler('Product Not Found', 404))
   }

   const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())


   let avg = 0;

   reviews.forEach((rev) => {
      avg += rev.rating;
   })

   const ratings = avg / reviews.length

   const numOfReviews = reviews.length;

   await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numOfReviews
   }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
   }
   )
   res.status(200).json({
      success: true,
   })
})
