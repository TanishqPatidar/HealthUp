const mongoose = require('mongoose');
const Disorder = mongoose.model('Disorder',new mongoose.Schema({
    name : String,
    symptoms : [ String ],
    treatment : [String],
    diet : [String],
    not_diet : [String]
}))
exports.Disorder = Disorder;
