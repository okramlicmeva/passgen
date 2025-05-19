const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  country: String
});

module.exports = mongoose.model('User', userSchema);

/* najlakse je da sve kuca coveculjak..  */