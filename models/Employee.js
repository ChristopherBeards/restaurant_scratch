const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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

// Pre-Save Hooks
EmployeeSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

EmployeeSchema.checkPassword = providedPass => {
  return bcrypr.compare(providedPass, this.password);
};

module.exports = Employee = mongoose.model('Employee', EmployeeSchema);
