const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Table = new Schema({
  server: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  number: {
    type: Number,
    required: true,
    max: 6,
  },
  food: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

module.exports = mongoose.model('Table', Table);
