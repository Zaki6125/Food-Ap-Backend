const mongoose = require('mongoose');
const categoryModel = new mongoose.Schema({
title:{
    type: String,
    require: [true , 'This filed will be required']
},
imgeUrl:{
    type: String,
    default: "https://imagekit.io/blog/content/images/2019/12/image-optimization.jpg"
}
},{timestamps: true});
module.exports = mongoose.model('Categorey' , categoryModel);