const express = require('express');
const route = express.Router();
const testControl = require('../controllers/testControllers');
route.get('/test-user' , testControl.getAllData );

module.exports = route ;