const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Item = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Item', Item);
