const Product = require('../models/product');
const Category = require('../models/category');
const { body,validationResult } = require('express-validator');

const async = require('async');

// const ProductSchema = new Schema(
//     {
//         name: { type: String, required: true, minLength: 2, maxLength: 100 },
//         imgsrc: { type: String, maxLength: 100 },
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

exports.product_add_get = function(req, res, next) {

  async.parallel({
      categories: function(callback) {
          Category.find(callback);
      },
      // today: function(callback) {
      //   new Date();
      // },
  }, function(err, results) {
      if (err) { return next(err); }
      res.render('product_form', { title: 'Add Product', cat: results.categories });
  });

};

// Array of middleware functions. Array is passed to the router function and each method is called in order.
// This approach is needed, because the validators are middleware functions.
exports.product_add_post = [
  // // Validate and sanitize fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  // body('description', 'Description invalid.').optional({ checkFalsy: true }).trim().escape(),
  body('quantity', 'Quantity invalid.').optional({ checkFalsy: true }).toInt().escape(),
  body('date_added', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
  // body('category', 'Category invalid.').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    console.log('processing request')

      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      // Check if Genre with same name already exists.
      // Genre.findOne({ 'name': req.body.name })
      // .exec( function(err, found_genre) {
      // if (err) { return next(err); }
      //   if (found_genre) {
      //     // Genre exists, redirect to its detail page.
      //     res.redirect(found_genre.url);
      //     }
      //   else {
      //     genre.save(function (err) {
      //       if (err) { return next(err); }
      //         // Genre saved. Redirect to genre detail page.
      //         res.redirect(genre.url);
      //       });
      //   }
      // });

      // Create a Product object with escaped and trimmed data.
      const product = new Product(
        { name: req.body.name,
          imgsrc: '',
          quantity: req.body.quantity,
          date_added: (req.body.date_added) ? req.body.date_added : new Date(),
          category: req.body.category
         });

      if (!errors.isEmpty()) {
        console.log('There are errors')
          // There are errors. Render form again with sanitized values/error messages.

          // Get all authors and genres for form.
          async.parallel({

          }, function(err, results) {
              if (err) { return next(err); }

              res.render('product_form', { title: 'Add Product', product: product, errors: errors.array() });
          });
          return;
      }
      else {
        // Data from form is valid. Save book.
        product.save(function (err) {
            console.log('saving')
            if (err) { 
              console.log('error before saving')
              return next(err); 
            }
            console.log('redirecting')
            //successful - redirect to new book record.
            res.redirect(product.url);
        });
      }
  }
];

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

exports.product_detail = function(req, res, next) {

  Product
    .findById(req.params.id)
    .populate('category')
    .exec(function(err, results) {
      if (err) { return next(err); }
      res.render('product_detail', { title: results.name, product: results });
    });

};
