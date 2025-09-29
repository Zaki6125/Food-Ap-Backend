const mongoose = require('mongoose');
const resturentSchema = new mongoose.Schema({
   title:{
    type: String,
    require: [true , 'Title will be required']
   },
   imgeUrl:{
    type: String
   },
   foods: {
    type: Array
   },
   time:{
    type: String
   },
   pickUp:{
    type: Boolean,
    default: true
   },
   delivery:{
    type: Boolean,
    default: true
   },
   isOpen:{
    type: Boolean,
    default: true
   },
   logoUrl:{
    type: String
   },
   rating:{
    type: Number,
    default: 1,
    min: 1,
    max: 5
   },
   ratingCount:{
    type: Number
   },
   code:{
    type: String
   },
   coodrs:{
    id:{type: Number},
    latitude: {type: Number},
    latitudeDelta: {type: Number},
    longitude:{type: Number},
    longitudeDelta: {type: Number},
    address: {type: String},
    title: {type: String}
    }
   },
   {timestamps: true}
);
module.exports = mongoose.model("Resturent" , resturentSchema);