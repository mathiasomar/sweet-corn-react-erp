const express = require('express');
const categoryController = require("../controllers/categoryController")

const router = express.Router()

router.get("/categories", categoryController.allCategories)
router.post("/categories", categoryController.addCategory)

module.exports = router