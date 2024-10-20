const bcrypt = require('bcryptjs')
const User = require('../models/User')
const createError = require('../utils/error')
const jwt = require('jsonwebtoken')

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(new createError("User not found!", 404))

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) {
            return next(new createError("Invalid credentials!", 401))
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: '1d'
        })

        res.cookie('access_token', token, { httpOnly: true }).status(200).json({
            status: "success",
            message: "Credentials verified successfully",
            token,
            user: {
                name: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        next(error)
    }
}