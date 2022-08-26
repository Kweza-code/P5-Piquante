const express = require('express');
const router = express.Router();
//associer les fonctions au differentes routes
const userCtrl = require('../controllers/user');

//creating routes post 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;