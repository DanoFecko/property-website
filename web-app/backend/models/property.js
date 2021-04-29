const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  location: {type: String, required: true, default: 'Slovakia'},
  type: {type: String, enum: ['LAND', 'HOUSE', 'APARTMENT'], required: true, default: 'LAND'},
  price: {type: Number, required: true, default: 0},
  owner: {type: String, required: true, default: 'admin'},
  size: {type: Number, required: true, default: 0},
  pictures: {type: [Number], required: true, default: []},
  status: {type: Boolean, required: true, default: false},
});

module.exports = mongoose.model('Property', propertySchema);
