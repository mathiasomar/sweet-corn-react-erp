const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand