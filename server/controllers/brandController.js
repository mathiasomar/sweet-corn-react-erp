const Brand = require('../models/Brand')
const createError = require('../utils/error')

exports.brands = async (req, res, next) => {
    const brands = await Brand.find().sort({ createdAt: -1 })
        .then(brands => res.json(brands))
        .catch(err => res.json(err))
}

exports.brand = async (req, res, next) => {
    const id = req.params.id

    const brand = await Brand.findById(id)
        .then(brand => res.json(brand))
        .catch(err => res.json(err))
}

exports.addBrand = async (req, res, next) => {
    try {
        const checkBrand = await Brand.findOne({ name: req.body.name })
        if (checkBrand) return next(new createError("Brand already exists!", 404))

        await Brand.create({ ...req.body })
        res.status(201).json({ message: "Brand Added Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.updateBrand = async (req, res, next) => {
    try {
        await Brand.findByIdAndUpdate({ _id: req.params.id }, { ...req.body })
        res.status(200).json({ message: "Brand Updated Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.deleteBrand = async (req, res, next) => {
    try {
        await Brand.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Brand Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}