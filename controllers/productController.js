var Product = require('../models/product');
var Category = require('../models/category');
const { body,validationResult } = require('express-validator');

var async = require('async');

// var ProductSchema = new Schema(
//     {
//         name: { type: String, required: true, minLength: 2, maxLength: 100 },
//         description: { type: String, maxLength: 100 },
//         quantity: { type: Number, default: 0 },
//         date_added: { type: Date, default: new Date },
//         category: [{ type: Schema.Types.ObjectId, ref: 'Category'}]
//     }
// );

exports.products_list = function(req, res, next) {
    Product
      .find({}, 'name quantity category')
      .sort({name: 1})
      .populate('category')
      .exec(function (err, products_list) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('products_list', { title: 'Products List', products: products_list });
      });
};

exports.product_add_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product_add_get');
};

exports.product_add_post = function(req, res) {
    res.send('NOT IMPLEMENTED: product_add_post');
};

exports.product_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product_delete_get');
};

exports.product_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: product_delete_post');
};

exports.product_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product_update_get');
};

exports.product_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: product_update_post');
};

exports.product_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: product_detail');
};
