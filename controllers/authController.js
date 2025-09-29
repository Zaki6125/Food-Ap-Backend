// const userModel = require("../models/userModel");

// const registerController = async (req, res)=>{
//   try {
//     const {userName , email , password , address, phone } = req.body;
//     if(!userName || !email || !password || !address || !phone)
//     {
//       return  res.status(500).send({
//             success: false,
//             message: 'Please provide All fields!!!'
//         })
//     }
//     //agr user all ready exists krta hai tw...
//     const existingUser = await userModel.findOne({email})
//     {
//         if(existingUser)
//         {
//            return res.status(400).send({
//                 success: false ,
//                 message: 'User will be find by id'
//             });
//         }
//     }
//     //agr nahi hai tw new add kro User....
//     const createUser = await userModel.create({userName, email, password,address, phone })
//     {
//       return res.status(201).send({
//             success: true,
//             message: 'All user will be created',
//             user: createUser
//         });
//     }
//   } catch (error) {
//     res.status(500).send({
//         success:false,
//         message: 'Register is not valid according to the credentails..',
//         error
//     })
//   }
// };

// module.exports = registerController;
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;

    // check fields
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields!!!'
      });
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email});
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    //hashing pasword yahan ho raha hai
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const createUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
      address,
      phone,
      answer
    });

    return res.status(201).send({
      success: true,
      message: 'User created successfully',
      user: createUser
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in Register API',
      error: error.message   // sirf error ka message send karo
    });
  }
};

//Login 

const loginController = async (req, res) => {
    try {
        //validation ho rhie hai
        const {email , password} = req.body;
        if(!email || !password)
        {
          return  res.status(500).send({
                success: false,
                message: "please provide Email or Password"
            });
        }

        //check user is avalible or not...
        const user = await userModel.findOne({email})
        {
            if(!user)
            {
               return  res.status(404).send({
                    success: false,
                    message: 'User not found'
                });
            }
            //compare password
            const isMatch = await bcrypt.compare(password, user.password);
            const token = jwt.sign({id: user._id} , process.env.secret_key,{
                expiresIn: '1d'
            }); 
            if(!isMatch)
            {
              return  res.status(500).send({
                    success: false,
                    message: 'give valid credentials..'
                })
            }
            res.status(201).send({
                success: true,
                message: 'User login sussceesfully!!',
                token,
                user,
              
            });
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Give valid credentials!!!' 
        })
    }
}

module.exports = {registerController ,loginController};
