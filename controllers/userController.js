const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const userController = async (req, res) =>{
 try {
    //find user
    const user = await userModel.findById( req.user.id);
    //validation
    if(!user)
    {
        return res.status(404).send({
            success: false,
            message: "User not found"
        })
    }
    //for hide password
    user.password = undefined;
    res.status(200).send({
        success: true,
        message: "User get successfully",
        user
    })

 } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message:"Error in get user api",
        error
    })
 }
}

//update user
const updateUserController = async (req, res)=>{
try {
    //find user
    const updateUser = await userModel.findById(req.user.id)
    //validation
    if(!updateUser)
    {
        return res.status(400).send({
            success: false,
            message: 'user not found'
        });
    }

    //update function
    const {userName , address, email} = req.body;
    if(userName) updateUser.userName = userName;
    if(address) updateUser.address = address;
    if(email) updateUser.email = email;
    //save the updated user
    await updateUser.save();
    res.status(200).send({
        success: true,
        message: "update Successfully"
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'User not Updated yet',
        error
    })
}
}
//update password
const updatePasswordController = async (req, res)=>{
  try {
    //find kro user
    const updatePass = await userModel.findById(req.user.body);
    //validation kro
    if(!updatePass)
    {
        return res.status(400).send({
            success: false,
            message: "User not found"
        })
    }
    //get data from user
    const {oldPassword , newPassword} = req.body;
    if(!oldPassword || !newPassword)
    {
        return res.status(500).send({
            success: false,
            message: 'Please provide old and new password'
        });
    }
    const isMatch = await bcrypt.compare(oldPassword , user.password);
    if(!isMatch)
    {
        return res.status(500).send({
            success: false,
            message: "Invalid old password"
        })
    }
       var salt = bcrypt.genSaltSync(10);
       const hashPassword = await bcrypt.hash(newPassword , salt);
       user.password = hashPassword;
       await user.save();
       res.status(200).send({
        success: true,
        message: "password will be updated"
       })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false ,
        message: 'Password not updated',
        error
    });
  }

 
}
 //reset password
  const resetPasswordController = async(req, res)=>{
     try {
        const {newPassword , email, answer} = req.body;
        if(!newPassword || !email || !answer)
        {
            return res.status(400).send({
                success: 'false',
                message: 'kindly provide the All given fields'
            });
        }
        //find user
        const user = await userModel.findOne({email, answer});
        if(!user)
        {
            return res.status(500).send({
                success: false,
                message: "Not Fouond"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Reset Succesfully!!"
        })
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in reset password API"
        })
     }
  }

  //delete user
 const deleteUserController = async (req, res) => {
  try {
   
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete API",
      error,
    });
  }
};

module.exports = {userController, updateUserController, updatePasswordController,resetPasswordController,deleteUserController}