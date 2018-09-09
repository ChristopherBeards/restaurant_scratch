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

/* Returns
{
    "msg": "Item Routes Work"
}
*/

// @route   POST api/items/add
// @desc    Creates an Item (admin/mgr)
// @access  Private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.status.admin === true || req.user.status.manager === true) {
      const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      });

      newItem
        .save()
        .then(item => {
          res.status(200).json(item);
        })
        .catch(err => {
          res.status(400).json({
            message: 'There was an error creating a new item',
            err: err,
          });
        });
    } else {
      res.status(401).json({ message: 'Not authorized!' });
    }
  },
);

/* Returns
{
    "_id": "5b952027e25ba84ce0cabb37",
    "name": "Sweet Potato Roll",
    "description": "A yummy delight for all sane mortals",
    "price": 3.99,
    "__v": 0
}
*/

// Export Router
module.exports = router;
