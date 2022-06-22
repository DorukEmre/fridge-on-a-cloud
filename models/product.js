var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { DateTime } = require("luxon");

var ProductSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    imgsrc: { type: String, maxLength: 100 },
    quantity: { type: Number, default: 0 },
    date_added: { type: Date, default: new Date() },
    category: { type: Schema.Types.ObjectId, ref: 'Category'}
  }
);

// Virtual for product's URL
ProductSchema
  .virtual('url')
  .get(function () {
    return '/product/' + this._id;
  });

ProductSchema
  .virtual('date_added_formatted')
  .get(function () {
    return this.date_added ? DateTime.fromJSDate(this.date_added).toLocaleString(DateTime.DATE_MED) : '';
  });


//Export model
module.exports = mongoose.model('Product', ProductSchema);
