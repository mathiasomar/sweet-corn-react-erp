const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    unit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

const purchaseSchema = new mongoose.Schema({
    ref: {
        type: String,
        required: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    pdate: {
        type: Date,
        required: true
    },
    items: [purchaseItemSchema],
    discount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    status: {
        type: String,
        enum: ['ordered', 'pending', 'received'],
        required: true
    }
}, { timestamps: true })

const Purchase = mongoose.model("Purchase", purchaseSchema)
module.exports = Purchase;