#! /usr/bin/env node

// console.log('This script populates some test products and categories to your database. Specified database as argument - e.g.: node populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')
const Product = require('./models/product')
const Category = require('./models/category')


const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let products = []
let categories = []

function categoryCreate(name, description, cb) {
  var category = new Category({ name: name, description: description });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function productCreate(name, quantity, date_added, category, image, cb) {
  productdetail = { 
    name: name,
    quantity: quantity,
    date_added: date_added
  }
  if (category != false) productdetail.category = category
  if (image != false) productdetail.image = image
    
  const product = new Product(productdetail);    
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}



function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate("Dairy", "Food products made from milk", callback);
        },
        function(callback) {
          categoryCreate("Fruits and vegetables","", callback);
        },
        function(callback) {
          categoryCreate("Cleaning","Products used to remove dirt and stains", callback);
        },
        ],
        // optional callback
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('Tomatoes', 5, '2022-06-18', categories[1], '', callback);
        },
        function(callback) {
          productCreate('Courgettes', 3, '2022-06-13', categories[1], '', callback);
        },
        function(callback) {
          productCreate('Pineapple', 1, '2022-06-15', categories[1], '', callback);
        },
        function(callback) {
          productCreate('Milk', 2, '2022-06-18', categories[0], '', callback);
        },
        function(callback) {
          productCreate('Cheddar', 1, '2022-06-15', categories[0], '', callback);
        },
        function(callback) {
          productCreate('Camembert', 1, '2022-06-17', categories[0], '', callback);
        },
        function(callback) {
          productCreate('Bleach', 3, '2022-03-18', categories[2], '', callback);
        },
        function(callback) {
          productCreate('Hand wash', 2, '2022-04-09', categories[2], '', callback);
        }
        ],
        // optional callback
        cb);
}




async.series([
    createCategories,
    createProducts,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('results: '+results);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




