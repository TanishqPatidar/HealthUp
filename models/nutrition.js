const mongoose = require('mongoose');

const Nutrient = mongoose.model('Nutrient',new mongoose.Schema({
    name : String,
    veg : [String],
    nonveg : [String]
}))

const Exercise = mongoose.model('Exercise',new mongoose.Schema({
    name:[String]
}))

exports.Nutrient = Nutrient;
exports.Exercise = Exercise;