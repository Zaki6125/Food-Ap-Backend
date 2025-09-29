const express = require('express');
const { userController, updateUserController , updatePasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

//get request
router.get('/getUser', authMiddleware,userController);
//update profile
router.put('/updateUser', authMiddleware,updateUserController)
//update password
router.post('/updatePassword' , authMiddleware, updatePasswordController)
//reset Password
router.post('/restPassword' , authMiddleware, resetPasswordController)
//delete user
router.delete('/deleteUser/:id' , authMiddleware, deleteUserController )
module.exports = router;
