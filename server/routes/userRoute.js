const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/users', userController.adduser)
router.get('/users', userController.allusers)
router.get('/users/:id', userController.getUserById)
router.delete('/users/:id', userController.deleteUser)

module.exports = router