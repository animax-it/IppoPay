const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Save result
router.post('/saveResult', (req, res) => {
  const { question, result } = req.body;

  const newResult = new Result({
    question,
    result
  });

  newResult.save()
    .then(savedResult => {
      res.json(savedResult);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error saving result' });
    });
});


module.exports = router;
