const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { creatRestuarentController, getAllResturentController, getResturentWithIdController,deleteResturentController } = require('../controllers/restuarentController');
//Create || request will be POST
router.post('/create' , authMiddleware,creatRestuarentController)
//Get all Resturent || request will GET
router.get('/getAll', authMiddleware,getAllResturentController)
//Get kro id k sath resturent ko || request will be get...
router.get('/get/:id' ,authMiddleware,getResturentWithIdController)
//Delete Resturent || request will be delete
router.delete('/delete/:id' , authMiddleware,deleteResturentController)
module.exports = router;