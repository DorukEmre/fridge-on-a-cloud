var Product = require('../models/product');
var Category = require('../models/category');

var async = require('async');

exports.home = function(req, res) {

    async.parallel({
        product_count: function(callback) {
            // Model.countDocuments() counts number of documents matching filter in a database collection.
            Product.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        category_count: function(callback) {
            Category.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Fridge on a cloud', error: err, data: results });
    });
};