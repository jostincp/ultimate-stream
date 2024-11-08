const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  points: { type: Number, default: 0 },
  // Otros campos necesarios
});

module.exports = mongoose.model('User', userSchema);