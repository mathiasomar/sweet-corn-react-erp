const express = require('express');
const productController = require('../controllers/productController')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.post('/products', isAuth, productController.addProduct)
router.get('/products', isAuth, productController.allProducts)
router.get('/products/:id', isAuth, productController.product)
router.delete('/products/:id', isAuth, productController.deleteProduct)
router.put('/products/:id', isAuth, productController.updateProduct)

module.exports = router