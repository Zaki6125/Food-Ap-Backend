const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {categoryController, getAllCategorey, updateCatogrey, deleteCat} = require('../controllers/categoryController');
//Category create || methid will be Post

router.post('/category' , authMiddleware,categoryController);
//Get categarey || method will be get
router.get('/getCategorey' ,  getAllCategorey);
//Update Categorey || method will be put
router.put('/update/:id' , authMiddleware, updateCatogrey);
//Delete Categorey || method will be delete
router.delete('/delete/:id' , authMiddleware, deleteCat)

module.exports = router;
