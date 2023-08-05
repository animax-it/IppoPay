const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  question: String,
  result: Number,
  createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
