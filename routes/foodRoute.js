const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createFood, getAllFood, getFoodWithId , getResturentWithId , updateFoodWithId, deleteUpdateController, placeOrder, orderStatusController}= require ('../controllers/foodController');
const adminMiddleware = require('../middleware/adminMiddleware');
//create food || method will be post
router.post('/food' , authMiddleware , createFood);
//get food || method will be get
router.get('/getFood' , authMiddleware, getAllFood);
//get Single food || method will be get
router.get('/getfoods/:id' , getFoodWithId)
//get resturent for food with id || method will be get
router.get('/getRest/:id' , getResturentWithId)
//update food || method will be put
router.put('/updateFood/:id' , authMiddleware , updateFoodWithId)
//delete
router.delete('/delete/:id' , authMiddleware , deleteUpdateController)
//placeOrder || method will be post
router.post('/plceOrder', authMiddleware, placeOrder)
//orderStatus ||method will be post
router.post('/statusOrder/:id' ,authMiddleware,adminMiddleware,orderStatusController)
module.exports = router;