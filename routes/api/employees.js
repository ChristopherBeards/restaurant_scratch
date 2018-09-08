const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Require Employee Model
const Employee = require('../../models/Employee');

// @route   GET api/employees/test
// @desc    Tests employees' route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Employee Routes Work' }));

// @route   POST api/employees/register
// @desc    Register an employee
// @access  Public
router.post('/register', (req, res) => {
  // create the employee
  Employee.findOne({ pin: req.body.pin }).then(employee => {
    if (employee) {
      return res.status(400).json({ error: 'Employee already registered!' });
    } else {
      const newEmployee = new Employee({
        name: req.body.name,
        pin: req.body.pin,
        password: req.body.password,
        status: {
          admin: req.body.status === 'admin' ? true : null,
          manager: req.body.status === 'manager' ? true : null,
        },
      });

      // save the employee
      newEmployee
        .save()
        .then(employee => {
          res.status(200).json(employee);
        })
        .catch(err => {
          res.status(400).json({
            message: 'There was an error creating a new employee',
            error: err,
          });
        });
    }
  });
});

/* RETURNS
{
    "status": {
        "admin": true,
        "manager": null
    },
    "_id": "5b9406933a8e0caaa4254739",
    "name": "admin",
    "pin": "0000",
    "password": "$2a$11$xiT9ACNt3sWyCoChsGiGUO/l/VjHpqG1/nkdeh7imxVCshmLueoba",
    "__v": 0
}
*/

// @route   GET api/employees/login
// @desc    Login Employee / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  // Pull off the pin and password from login
  const { pin, password } = req.body;

  // Find the employee
  Employee.findOne({ pin })
    .then(employee => {
      if (!employee) {
        return res
          .status(404)
          .json({ error: 'No employee by that pin exists!' });
      } else {
        // Check the password on the model
        employee.checkPassword(password).then(verified => {
          if (verified) {
            const payload = {
              id: employee._id,
              pin: employee.pin,
              status: {
                admin: employee.status.admin,
                manager: employee.status.manager,
              },
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: '1d' },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              },
            );
          }
        });
      }
    })
    .catch(err => {
      res.status(400).json({ message: 'Something went wrong!', error: err });
    });
});

/* Returns
{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTQwNjkzM2E4ZTBjYWFhNDI1NDczOSIsInBpbiI6IjAwMDAiLCJzdGF0dXMiOnsiYWRtaW4iOnRydWUsIm1hbmFnZXIiOm51bGx9LCJpYXQiOjE1MzY0MzIzMzIsImV4cCI6MTUzNjUxODczMn0.Ie6EbuPnaBzVxnj39rXU_4w-xycGlHytgEMNPPzi2ZA"
}
*/

// @route   GET api/employees/current
// @desc    Return current employee
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      pin: req.user.pin,
      status: req.user.status,
    });
  },
);

/* Returns
{
    "id": "5b9406933a8e0caaa4254739",
    "pin": "0000",
    "status": {
        "admin": true,
        "manager": null
    }
}
*/

// @route   GET api/employees/all
// @desc    Return all registered employees
// @access  Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.status.admin || req.user.status.manager) {
      Employee.find({})
        .then(users => {
          res.status(200).json(users);
        })
        .catch(err => {
          res.status(404).json({ message: 'No employees found!', error: err });
        });
    } else {
      res.status(401).json({ err: 'Not authorized!' });
    }
  },
);

/* Returns
[
    {
        "status": {
            "admin": true,
            "manager": null
        },
        "_id": "5b9406933a8e0caaa4254739",
        "name": "admin",
        "pin": "0000",
        "password": "$2a$11$xiT9ACNt3sWyCoChsGiGUO/l/VjHpqG1/nkdeh7imxVCshmLueoba",
        "__v": 0
    }
]
*/

// Export Router
module.exports = router;
