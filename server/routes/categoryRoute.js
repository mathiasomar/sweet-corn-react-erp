const express = require('express');
const categoryController = require("../controllers/categoryController")

const router = express.Router()

router.get("/categories", categoryController.allCategories)
router.get("/category/:id", categoryController.category)
router.post("/categories", categoryController.addCategory)
router.put("/category/:id", categoryController.updateCategory)
router.delete("/category/:id", categoryController.deleteCategory)

module.exports = router