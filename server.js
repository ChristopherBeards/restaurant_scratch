const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Initialize express variable
const app = express();

// Middleware
app.use(express.json());

// Port
const PORT = process.env.PORT || 5000;

// Load Employee Model
const employees = require('./routes/api/employees');

// Employee Routes
app.use('/api/employees', employees);

//===================================
//             Listening
//===================================

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//===================================
//             Routes
//===================================
