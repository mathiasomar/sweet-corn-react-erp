const Unit = require('../models/Unit')
const createError = require('../utils/error')

exports.units = async (req, res, next) => {
    const units = await Unit.find().sort({ createdAt: -1 })
        .then(units => res.json(units))
        .catch(err => res.json(err))
}

exports.unit = async (req, res, next) => {
    const id = req.params.id

    const unit = await Unit.findById(id)
        .then(unit => res.json(unit))
        .catch(err => res.json(err))
}

exports.addUnit = async (req, res, next) => {
    try {
        const checkUnit = await Unit.findOne({ name: req.body.name })
        if (checkUnit) return next(new createError("Unit already exists!", 404))

        const checkUnitShortname = await Unit.findOne({ shortname: req.body.shortname })
        if (checkUnitShortname) return next(new createError("Unit shortname already exists!", 404))

        await Unit.create({ ...req.body })
        res.status(201).json({ message: "Unit Added Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.updateUnit = async (req, res, next) => {
    try {
        await Unit.findByIdAndUpdate({ _id: req.params.id }, { ...req.body })
        res.status(200).json({ message: "Unit Updated Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.deleteUnit = async (req, res, next) => {
    try {
        await Unit.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Unit Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}