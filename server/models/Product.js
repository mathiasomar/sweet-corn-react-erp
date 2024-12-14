const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    unitValue: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    productimg: {
        type: String
    },
    orderTax: {
        type: Number,
        default: "0"
    },
    discount: {
        type: Number,
        default: "0"
    },
    description: {
        type: String
    },
    imei: {
        type: Boolean,
    },
    notForSale: {
        type: Boolean
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)
module.exports = Product