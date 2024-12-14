const express = require('express')
const unitController = require('../controllers/unitController')

const router = express.Router();

router.get('/units', unitController.units)
router.get('/unit/:id', unitController.unit)
router.post('/units', unitController.addUnit)
router.put('/unit/:id', unitController.updateUnit)
router.delete('/unit/:id', unitController.deleteUnit)

module.exports = router