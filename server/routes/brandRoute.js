const express = require('express')
const brandController = require('../controllers/brandController')

const router = express.Router();

router.get('/brands', brandController.brands)
router.get('/brand/:id', brandController.brand)
router.post('/brands', brandController.addBrand)
router.put('/brand/:id', brandController.updateBrand)
router.delete('/brand/:id', brandController.deleteBrand)

module.exports = router