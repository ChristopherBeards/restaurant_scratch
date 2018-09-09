const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Employee Model
const Table = require('../../models/Table');

// @route   GET api/tables/test
// @desc    Tests table routes
// @access  Private
router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.json({ msg: 'Table Routes Work' }),
);

// Export Router
module.exports = router;
