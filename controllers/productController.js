const Product = require('../models/product');
const Category = require('../models/category');
const { body,validationResult } = require('express-validator');
const path = require('path')
const Resize = require('../middleware/resize');
const Image = require('../models/image');

const async = require('async');

exports.products_list = function(req, res, next) {
  Product
    .find({}, 'name quantity category')
    .sort({name: 1})
    .populate('category')
    .populate('image')
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

  async (req, res, next) => {
    if(req.fileValidationError) {
      return res.end(req.fileValidationError);
    }
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }
  
    const imageFolder = '/uploads/';
    const imagePath = path.join(__dirname, `/../public${imageFolder}`);
    
    const fileUpload200 = new Resize(imagePath, 200, 95);
    const filename200 = await fileUpload200.save(req.file.buffer);
    const fileUpload1000 = new Resize(imagePath, 1000, 90);
    const filename1000 = await fileUpload1000.save(req.file.buffer);
  
    const newImage = new Image(
      {
        contentType: 'image/jpeg',
        path: imagePath,
        imageFolder: imageFolder,
        filename200: filename200,
        filename1000: filename1000
      }
    );  
    req.file.newImage = newImage // To add to Product model in next middleware
    
    newImage.save((err) => {
        // err ? console.log(err) : res.redirect("/");
        if (err) { return next(err); }
    });
    next();
  },

  // Process request after validation and sanitization.
  (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Product object with escaped and trimmed data.
      const product = new Product(
        { name: req.body.name,
          quantity: req.body.quantity,
          date_added: (req.body.date_added) ? req.body.date_added : new Date(),
          category: req.body.category,
          image: req.file.newImage
         });

      if (!errors.isEmpty()) {
        // console.log('There are errors')
        //   // There are errors. Render form again with sanitized values/error messages.

        //   async.parallel({

        //   }, function(err, results) {
        //       if (err) { return next(err); }

        //       res.render('product_form', { title: 'Add Product', product: product, errors: errors.array() });
        //   });
        //   return;
      }
      else {
        // Data from form is valid. Save book.
        product.save(function (err) {
            if (err) { 
              return next(err); 
            }
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
    .populate('image')
    .exec(function(err, results) {
      if (err) { return next(err); }
      res.render('product_detail', { title: results.name, product: results });
    });

};
