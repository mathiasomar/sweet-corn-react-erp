const createError = require('../utils/error')
const Supplier = require('../models/Supplier')

exports.allSuppliers = async (req, res, next) => {
    const suppliers = await Supplier.find().sort({ createdAt: -1 })
        .then(suppliers => res.json(suppliers))
        .catch(err => res.json(err))
}

exports.addSupplier = async (req, res, next) => {
    try {
        const checkEmail = await Supplier.findOne({ name: req.body.email })
        if (checkEmail) return next(new createError("Supplier already exists!", 404))

        const checkPhone = await Supplier.findOne({ name: req.body.phone })
        if (checkPhone) return next(new createError("Phone number used!", 404))

        await Supplier.create({ ...req.body })
        res.status(201).json({ message: "Supplier Saved Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.supplier = async (req, res, next) => {
    const id = req.params.id
    const supplier = await Supplier.findById({ _id: id })
        .then(supplier => res.json(supplier))
        .catch(err => res.json(err))
}

exports.deleteSupplier = async (req, res, next) => {
    const id = req.params.id
    try {
        await Supplier.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Supplier Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.updateSupplier = async (req, res, next) => {
    try {
        await Supplier.findByIdAndUpdate({_id: req.params.id}, {...req.body})
        res.status(200).json({ message: "Supplier Updated Successfully" })
    } catch (error) {
        next(error)
    }
}