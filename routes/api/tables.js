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

// @route   POST api/tables/add
// @desc    Create a table
// @access  Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { number } = req.body;

    const newTable = new Table({
      number,
    });

    newTable
      .save()
      .then(table => {
        res.status(200).json(table);
      })
      .catch(err => {
        res.status(400).json({ message: 'Something went wrong!', err: err });
      });
  },
);

/* Returns
{
    "_id": "5b952933be259baafcc5bcaf",
    "number": 0,
    "server": [],
    "food": [],
    "__v": 0
}
*/

// Export Router
module.exports = router;
