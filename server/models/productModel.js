const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name'],
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Please Enter Description']
    },
    price: {
        type: String,
        required: [true, 'Please Enter Price'],
        maxLength: [8, 'Price can not exceed 8 character']
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            publick_id: {
                type: String,
                reqiured: true
            },
            url: {
                type: String,
                reqiured: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please Enter Product Category'],
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Profuct'],
        maxLength: [4, 'Stock cannot exceed 4 character'],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Porduct', productSchema)