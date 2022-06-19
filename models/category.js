var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: { type: String, required: true, minLength: 3, maxLength: 100 },
        description: { type: String, maxLength: 300 }
    }
);

CategorySchema
    .virtual('url')
    .get(function () {
        return '/fridge/category/' + this._id;
    });

     
module.exports = mongoose.model('Category', CategorySchema);