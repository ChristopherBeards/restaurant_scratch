const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Table = new Schema({
  number: {
    type: Number,
    required: true,
  },
  server: [
    {
      employee: {
        type: Schema.Types.ObjectId,
        ref: 'employees',
      },
    },
  ],
  food: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'items',
      },
    },
  ],
});

module.exports = mongoose.model('Table', Table);
