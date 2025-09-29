const express = require('express');
const {registerController, loginController} = require('../controllers/authController');
const router = express.Router();
//REGISTER WITH POST
router.post('/register' , registerController);

//LOGI WITH POST
router.post('/login' , loginController)

module.exports = router;