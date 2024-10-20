const express = require('express');
const supplierController = require('../controllers/supplierController')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/suppliers', isAuth, supplierController.allSuppliers)
router.post('/suppliers', isAuth, supplierController.addSupplier)
router.get('/suppliers/:id', isAuth, supplierController.supplier)
router.delete('/suppliers/:id', isAuth, supplierController.deleteSupplier)
router.put('/suppliers/:id', isAuth, supplierController.updateSupplier)

module.exports = router