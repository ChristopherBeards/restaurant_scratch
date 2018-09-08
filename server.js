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

//===================================
//         Connect to MongoDB
//===================================
const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//===================================
//             Listening
//===================================

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//===================================
//             Routes
//===================================
app.use('/api/employees', employees);
