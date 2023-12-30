const Order = require('../models/orderModel')
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('../middleware/CatchAsyncError');

//Create New Order
exports.newOrder = CatchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order
    })

})

// Get Single Order

exports.getSingleOrder = CatchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler('Order Not Found with whis id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get loggedin user Order

exports.myOrders = CatchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })
})

// Get All Orders --Admin

exports.getAllOrders = CatchAsyncError(async (req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


// Update Order Status --Admin

exports.updateOrderStatus = CatchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found with this id', 404))
    }

    if (order.orderStatus === 'Delivered' || order.orderStatus === 'delivered' ) {
        return next(new ErrorHandler('You have already delivered this order', 404))
    }

    order.orderItems.forEach(async od => {
        await updateStock(od.product, od.quantity)
    })

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save()


    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save()
}

// Delete Order --Admin
exports.deleteOrder = CatchAsyncError(async (req, res, next) => {

    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found with this id', 404))
    }

    res.status(200).json({
        success: true,
    })
})

