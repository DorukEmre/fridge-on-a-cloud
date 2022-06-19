var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    description: { type: String, maxLength: 100 },
    quantity: { type: Number, default: 0 },
    date_added: { type: Date, default: new Date },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category'}]
  }
);

// Virtual for product's URL
ProductSchema
  .virtual('url')
  .get(function () {
    return '/fridge/product/' + this._id;
  });

//Export model
module.exports = mongoose.model('Product', ProductSchema);
