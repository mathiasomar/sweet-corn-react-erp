const createError = require('../utils/error')
const Category = require("../models/Category")

exports.allCategories = async (req, res, next) => {
    const categories = await Category.find()
        .then(categories => res.json(categories))
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