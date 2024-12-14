const createError = require('../utils/error')
const Category = require("../models/Category")

exports.allCategories = async (req, res, next) => {
    const categories = await Category.find().sort({ createdAt: -1 })
        .then(categories => res.json(categories))
        .catch(err => res.json(err))
}

exports.category = async (req, res, next) => {
    const id = req.params.id
    const category = await Category.findById({ _id: id })
        .then(category => res.json(category))
        .catch(err => res.json(err))
}

exports.addCategory = async (req, res, next) => {
    try {
        const checkName = await Category.findOne({ name: req.body.name })
        if (checkName) return next(new createError("Category already exists!", 404))

        await Category.create({ ...req.body })
        res.status(201).json({ message: "Category Saved Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndUpdate({ _id: req.params.id }, { ...req.body })
        res.status(200).json({ message: "Category Updated Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Category Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}