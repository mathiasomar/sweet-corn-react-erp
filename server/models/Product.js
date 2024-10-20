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
    unit: {
        type: String,
        required: true
    },
    unitvalue: {
        type: Number,
        required: true
    },
    package: {
        type: "number",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
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
    discount: {
        type: Number
    },
    vat: {
        type: Number
    },
    description: {
        type: String
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)
module.exports = Product