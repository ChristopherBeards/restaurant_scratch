const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    admin: {
      type: Boolean,
      default: false,
      subscription: String,
      membership: {
        type: Boolean,
        default: false,
      },
    },
    manager: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = Employee = mongoose.model('employees', EmployeeSchema);
