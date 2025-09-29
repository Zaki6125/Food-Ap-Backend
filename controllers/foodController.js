const foodModel = require ('../models/foodModel');
const orderModel = require('../models/orderModel');
//create Food || method will be post
const createFood = async (req, res) =>{
 try {
     //create food items
  const { title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating} = req.body;
  if(!title || !description || !price || !resturnat)
  {
    return res.status(500).send({
        success: false,
        message: "Please Filled the required Data...",
       
    })
  }
  const food = new foodModel({
     title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating
  })
   await food.save();
   res.status(200).send({
    success: true,
    message: "Food will be listed...",
    food
   })
 } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "This Api not work..",
        error
    })
 }
}

//Get all foods || method will be get
const getAllFood = async (req, res) =>{
    try {
        const getFood = await foodModel.find({});
        if(!getFood)
        {
            return res.status(500).send({
                success: false,
                message: "Not found..."
            })
        }
        res.status(200).send({
            success: true,
            message: "You will succesfully get the food...",
            food: getFood.length,
            getFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "This Api should not work"
        })
    }
}

//get Single food with id || method will be get
const getFoodWithId = async (req, res) => {
    try {
        const foodId = req.params.id ;
        if(!foodId)
        {
            return res.status(404).send({
                success: false,
                message: "give food if"
            })
        }
        const findFood = await foodModel.findById(foodId);
        if(!findFood)
        {
            return res.status(404).send({
                success: false,
                message: "Not found.."
            })
        }
        res.status(200).send({
            success: true,
            message: "Successfully find by id...",
            findFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "This APi will not work..."
        })
    }
}
//get resturent with id 

const getResturentWithId = async (req, res) => {
    try {
        const restId = req.params.id ;
        if(!restId)
        {
            return res.status(404).send({
                success: false,
                message: "give food if"
            })
        }
        const restFood = await foodModel.find({resturnat: restId});
        if(!restFood)
        {
            return res.status(404).send({
                success: false,
                message: "Not found.."
            })
        }
        res.status(200).send({
            success: true,
            message: "Successfully find by id...",
            restFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "This APi will not work..."
        })
    }
}
//Update foods || method will be put

const updateFoodWithId = async (req, res) =>{
    try {
        const id = req.params.id ;
        if(!id)
        {
            return res.status(404).send({
                success: false,
                message : "Please Give valid Id"
            })
        }
        const Food = await foodModel.findById(id);
        if(!Food)
        {
            return res.status(404).send({
                success: false,
                message: "Not update food yet..."
            })
        }
       const {    title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating } = req.body ;

      const updateFood = await foodModel.findByIdAndUpdate(id , {title , description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating}, {new: true});
        res.status(200).send({
            success: true,
            message: "Update Food Successfully!!",
            updateFood
        });
       
    } catch (error) {
       console.log(error);
       res.status(500).send({
        success: false,
        message: 'This Api will not found!!!'
       }) 
    }
}

//delete //Method will be 
const deleteUpdateController = async  (req, res)=>{
    try {
        const id = req.params.id ;
        if(!id)
        {
            return res.status(404).send({
                success: false,
                message: "Id will not found...."
            });
        }
        const deleteFood = await foodModel.findById(id);
        if(!deleteFood)
        {
            return res.status(500).send({
                success: false,
                message: "Your given Id will not found...."
            });
        }
        await foodModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Successfully delete the id "
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'This Api Will not Working'
        })
    }
}
//Place Order ||Method will be post.....
const placeOrder = async (req , res) =>{
    try {
        const {cart} = req.body ;
        if(!cart)
        {
            return res.status(404).send({
                success: false,
                message: "Cart will be not found"
            })
        }
       
        if(!cart)
        {
            return res.status(500).send({
                success: false,
                message: "Cart Will be Empty...."
            })
        }
         let total = 0;
       cart.forEach((item) => {
      total += item.price ; // ✅ price * quantity
    });
       const newOrder = new orderModel({
        payment:total,
        foods: cart,
        buyer: req.user.id
        
       })
       await newOrder.save();
       res.status(200).send({
        success: true,
        message: "Successfully created the new Cart order",
        newOrder
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "This Api will not work"
        })
    }
}

//
const orderStatusController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Order ID is required",
      });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Status is required",
      });
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error in orderStatusController",
    });
  }
};

module.exports = {createFood , getAllFood, getFoodWithId,  getResturentWithId, updateFoodWithId,deleteUpdateController, placeOrder, orderStatusController}