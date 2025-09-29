const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
  try {
    // user id from JWT middleware
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    if (user.userType == 'admin') {
      return res.status(403).send({   // 403 better hai "forbidden" ke liye
        success: false,
        message: "Only admin can access this..."
      });
    }

   else
   {
    next();
   }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth API",
      error
    });
  }
};
