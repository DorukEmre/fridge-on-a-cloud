var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');
var author_controller = require('../controllers/categoryController');


/// PRODUCT ROUTES ///

// GET fridge home page.
router.get('/', product_controller.index);

/// CAEGORY ROUTES ///

module.exports = router;
