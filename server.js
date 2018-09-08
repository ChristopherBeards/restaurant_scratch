const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Initialize express variable
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
