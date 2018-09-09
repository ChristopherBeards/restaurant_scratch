const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Employee Model
const Item = require('../../models/Item');

// @route   GET api/items/test
// @desc    Tests items' route
// @access  Private
router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.json({ msg: 'Item Routes Work' }),
);

// Export Router
module.exports = router;
