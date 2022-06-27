const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    contentType: String,
    path: String,
    imageFolder: String,
    filename200: String,
    filename1000: String,
    timeUploaded: Date,
    GPSLatitudeRef: String,
    GPSLatitude: Number,
    GPSLongitudeRef: String,
    GPSLongitude: Number
  }
);

module.exports = mongoose.model("Image", ImageSchema);