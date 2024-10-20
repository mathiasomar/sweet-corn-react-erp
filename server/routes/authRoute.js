const express = require('express');
const userAuth = require('../controllers/authController')

const router = express.Router()

router.post('/signin', userAuth.loginUser)

module.exports = router