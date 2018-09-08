const express = require('express');
const router = express.Router();

// Require Employee Model
const Employee = require('../../models/Employee');

// @route   GET api/employees/test
// @desc    Tests employees' route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Employee Routes Work' }));

// Export Router
module.exports = router;
