const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    purchaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Float32Array,
        required: true
    },
    tax: {
        type: Float32Array,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    total: {
        type: Float32Array,
        required: true
    },
    status: {
        type: String,
        enum: ['ordered', 'pending', 'received'],
        required: true
    },
    note: {
        type: String
    }
}, { timestamps: true })

const PurchaseItem = mongoose.model('Purchaseitem', purchaseItemSchema)
module.exports = PurchaseItem