const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// * Load Employee Routes
const employees = require('./routes/api/employees');
const items = require('./routes/api/items');

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Initialize Passport
app.use(passport.initialize());
// Passes passport to passport.js
require('./config/passport.js')(passport);

//===================================
//              Server
//===================================
const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/employees', employees);
app.use('/api/items', items);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
