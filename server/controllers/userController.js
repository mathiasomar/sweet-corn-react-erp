const bcrypt = require('bcryptjs')
const User = require('../models/User')
const createError = require('../utils/error')

exports.allusers = async (req, res, next) => {
    const users = await User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

exports.getUserById = async (req, res, next) => {
    const id = req.params.id
    const user = await User.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

exports.adduser = async (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    try {
        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail) return next(new createError("User already exists!", 404))

        const checkPhone = await User.findOne({ phone: req.body.phone })
        if (checkPhone) return next(new createError("Phone already exists!", 404))

        await User.create({ ...req.body, password: hashedPassword })
        res.status(201).json({ message: "User Saved Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    const id =  req.params.id

    await User.findByIdAndDelete({_id: id})
    res.status(200).json({message: "User deleted successfully!"})
}