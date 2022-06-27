// Resize images with sharp module
// https://appdividend.com/2022/03/03/node-express-image-upload-and-resize/

const sharp = require('sharp');
const path = require('path');

class Resize {
  constructor(folder, dimension, measurement, quality) {
    this.folder = folder;
    this.dimension = dimension;
    this.measurement = measurement;
    this.quality = quality;
  }
  async save(buffer) {
    const filename = Resize.filename(this.measurement);
    const filepath = this.filepath(filename);

    await sharp(buffer)
      // .resize(300, 300, {
      //   fit: sharp.fit.inside,
      //   withoutEnlargement: true
      // })
      .resize({
        fit: sharp.fit.contain,
        [this.dimension]: this.measurement
      })
      .jpeg({ quality: this.quality, chromaSubsampling: '4:4:4' })
      .toFile(filepath);
      
    return filename;
  }
  static filename(measurement) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return `${uniqueSuffix}-${measurement}.jpg`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}

module.exports = Resize;