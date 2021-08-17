const mongoose = require('mongoose');

const Disease = mongoose.model('Disease',new mongoose.Schema({
    name : String,
    organ_affected : [String],
    symptoms : [ String ],
    treatment : [String],
    diet : [String],
    not_diet : [String]
}))
exports.Disease = Disease;
