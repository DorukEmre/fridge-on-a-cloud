var express = require('express');
var router = express.Router();

// Require controller modules.
var category_controller = require('../controllers/categoryController');


/// CATEGORY ROUTES ///

// GET request for list of all Category items.
router.get('/', category_controller.categories_list);

// // GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
// router.get('/add', category_controller.category_add_get);

// // POST request for creating Category.
// router.post('/add', category_controller.category_add_post);

// // GET request to delete Category.
// router.get('/:id/delete', category_controller.category_delete_get);

// // POST request to delete Category.
// router.post('/:id/delete', category_controller.category_delete_post);

// // GET request to update Category.
// router.get('/:id/update', category_controller.category_update_get);

// // POST request to update Category.
// router.post('/:id/update', category_controller.category_update_post);

// // GET request for one Category.
// router.get('/:id', category_controller.category_detail);





module.exports = router;