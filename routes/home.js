const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'express app',
    message: 'hello'
  });
});

module.exports = router;