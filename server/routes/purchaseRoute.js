const express = require('express');
const purchaseController = require('../controllers/purchaseController')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/purchases', isAuth, purchaseController.allPurchases)
router.post('/purchases', isAuth, purchaseController.addPurchase)
router.get('/purchases/:id', isAuth, purchaseController.purchase)

module.exports = router