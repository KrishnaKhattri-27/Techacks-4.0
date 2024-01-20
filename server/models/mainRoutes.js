const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ msg: 'Api is Running' });
});

router.get('/secrets', authController.isAuthenticated, (req, res) => {
  res.send({ msg: 'Secrets Page' });//these two lines need to be changed
});

module.exports = router;