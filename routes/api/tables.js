const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Employee Model
const Table = require('../../models/Table');
const Employee = require('../../models/Employee');

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
    "food": [],
    "_id": "5b9564a9ed2e4d86346d6c84",
    "number": 0,
    "__v": 0
}
*/

// @route   POST api/tables/update
// @desc    Update a table with data
// @access  Private
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { tableId, employeeId, food } = req.body;
    Table.findByIdAndUpdate({ _id: tableId })
      .then(table => {
        Employee.findById({ _id: employeeId }).then(employee => {
          // Add the table to the employees table list
          employee.tables.push(table._id);
          // Save the employee as a server on table
          table.server = employee._id;
          // Add food to our table
          food.forEach(item => table.food.push(item.id));
          // Save the updated table
          table.save().then(table => {
            res.status(200).json(table);
          });
        });
      })
      .catch(err => {
        res.status(400).json({ message: 'Something went wrong!', err: err });
      });
  },
);

/* Returns
{
    "food": [
        "5b956483ed2e4d86346d6c82",
        "5b9564a0ed2e4d86346d6c83"
    ],
    "_id": "5b9564a9ed2e4d86346d6c84",
    "number": 0,
    "__v": 1,
    "server": "5b9406933a8e0caaa4254739"
}
*/

// @route   GET api/tables/current
// @desc    Return current table
// @access  Private
router.get('/current/:id', (req, res) => {
  const { id } = req.params;
  Table.findById({ _id: id })
    .populate('server')
    .populate('food')
    .then(table => {
      res.status(200).json(table);
    })
    .catch(err => {
      res.status(400).json({ message: 'Something went wrong!', error: err });
    });
});

/* Returns
{
    "food": [
        {
            "_id": "5b956483ed2e4d86346d6c82",
            "name": "Shrimp Tempura",
            "description": "A yummy delight for all sane mortals and also yum",
            "price": 5.99,
            "__v": 0
        },
        {
            "_id": "5b9564a0ed2e4d86346d6c83",
            "name": "Sweet Potato Roll",
            "description": "A yummy delight for all sane mortals",
            "price": 4.99,
            "__v": 0
        }
    ],
    "_id": "5b9564a9ed2e4d86346d6c84",
    "number": 0,
    "__v": 1,
    "server": {
        "status": {
            "admin": true,
            "manager": null
        },
        "tables": [],
        "_id": "5b9406933a8e0caaa4254739",
        "name": "admin",
        "pin": "0000",
        "password": "$2a$11$xiT9ACNt3sWyCoChsGiGUO/l/VjHpqG1/nkdeh7imxVCshmLueoba",
        "__v": 0
    }
}
*/

// Export Router
module.exports = router;
