const createError = require('../utils/error')
const Product = require('../models/Product')

exports.addProduct = async (req, res, next) => {
    try {
        await Product.create({ ...req.body })
        res.status(201).json({ message: "Product Saved Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.allProducts = async (req, res, next) => {
    const products = await Product.find().sort({ createdAt: -1 })
        // .populate('categoryId')
        .populate({ path: 'categoryId', select: ['name'] })
        .then(products => res.json(products))
        .catch(err => res.json(err))
}

exports.product = async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById({ _id: id })
        .populate({ path: 'categoryId', select: ['name'] })
        .then(product => res.json(product))
        .catch(err => res.json(err))
}

exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id
    try {
        await Product.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Product Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndUpdate({_id: req.params.id}, {...req.body})
        res.status(200).json({ message: "Product Updated Successfully" })
    } catch (error) {
        next(error)
    }
}