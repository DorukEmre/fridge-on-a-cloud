const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Require controller modules.
const product_controller = require('../controllers/productController');


/// PRODUCT ROUTES ///

// GET request for list of all Product items.
router.get('/', product_controller.products_list);

// GET request for creating a Product. NOTE This must come before routes that display Product (uses id).
router.get('/add', product_controller.product_add_get);

// // POST request for creating Product.
// File with name 'imgsrc' from the form is passed into upload/multer
router.post('/add', upload.single("imgsrc"), product_controller.product_add_post);

// // GET request to delete Product.
// router.get('/:id/delete', product_controller.product_delete_get);

// // POST request to delete Product.
// router.post('/:id/delete', product_controller.product_delete_post);

// // GET request to update Product.
// router.get('/:id/update', product_controller.product_update_get);

// // POST request to update Product.
// router.post('/:id/update', product_controller.product_update_post);

// // GET request for one Product.
router.get('/:id', product_controller.product_detail);


module.exports = router;