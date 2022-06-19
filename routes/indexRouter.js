var express = require('express');
var router = express.Router();

// Require controller modules.
var index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.home);

// GET redirect to Product home page.
router.get('/products', (req, res) => res.redirect('/product'));

// GET redirect to Category home page.
router.get('/categories', (req, res) => res.redirect('/category'));

module.exports = router;