const Product = require('../models/product');
const Category = require('../models/category');
const { body,validationResult } = require('express-validator');

const async = require('async');

// const CategorySchema = new Schema(
//   {
//       name: { type: String, required: true, minLength: 3, maxLength: 100 },
//       description: { type: String, maxLength: 300 }
//   }
// );

exports.categories_list = function(req, res, next) {
  Category
    .find()
    .sort({name: 1})
    .exec(function (err, categories_list) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('categories_list', { title: 'Categories List', cat: categories_list });
    });
};
exports.category_create_get = function(req, res) {
  res.render('category_form', { title: 'Create a new category' });
};

exports.category_create_post = [
  // Validate and sanitize fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description invalid.').optional({ checkFalsy: true }).trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    console.log('processing request')

      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      // Create a genre object with escaped and trimmed data.
      const category = new Category({ 
        name: req.body.name,
        description: req.body.description,
        }
      );
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('category_form', { title: 'Create Category', category: category, errors: errors.array()});
        return;
      }
      else {
      // Check if Category with same name already exists.
      Category
        .findOne({ 'name': req.body.name })
        .exec( function(err, found_category) {
          if (err) { return next(err); }
          if (found_category) {
            // Category exists, redirect to its detail page.
            res.redirect(found_category.url);
          }
          else {
            category.save(function (err) {
              if (err) { return next(err); }
                // Category saved. Redirect to category detail page.
                res.redirect(category.url);
              });
          }
        });
      }      
  }
];

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

  async.parallel({
    category: function(callback) {
        Category.findById(req.params.id)
          .exec(callback);
    },
    products: function(callback) {
      Product.find({ 'category': req.params.id })
        .exec(callback);
    }
  }, function(err, results) {
    if (err) { return next(err); }
    res.render('category_detail', { title: results.category.name, category: results.category, products: results.products });
  });

};

