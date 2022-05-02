const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//appel des post pour l'inscription et la connexion
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;