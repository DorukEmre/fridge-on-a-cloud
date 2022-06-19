var Product = require('../models/product');
var Category = require('../models/category');
const { body,validationResult } = require('express-validator');

var async = require('async');

// const CategorySchema = new Schema(
//   {
//       name: { type: String, required: true, minLength: 3, maxLength: 100 },
//       description: { type: String, maxLength: 300 }
//   }
// );

exports.categories_list = function(req, res, next) {
  Category
    .find({}, 'name description')
    .sort({name: 1})
    .exec(function (err, categories_list) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('categories_list', { title: 'Categories List', cat: categories_list });
    });
};
exports.category_add_get = function(req, res) {
    res.send('NOT IMPLEMENTED: category_add_get');
};

exports.category_add_post = function(req, res) {
    res.send('NOT IMPLEMENTED: category_add_post');
};

exports.category_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: category_delete_get');
};

exports.category_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: category_delete_post');
};

exports.category_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: category_update_get');
};

exports.category_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: category_update_post');
};

exports.category_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: category_detail');
};

