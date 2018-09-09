const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Create Schema
const Employee = new Schema({
  tables: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tables',
    },
  ],
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
    min: 4,
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

// Pre-Save Hook
Employee.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Why no use arrow functions again??
Employee.methods.checkPassword = function(providedPass) {
  return bcrypt.compare(providedPass, this.password);
};

module.exports = mongoose.model('Employee', Employee);
