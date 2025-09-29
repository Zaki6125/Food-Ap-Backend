const Jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided, Authorization denied"
      });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    Jwt.verify(token, process.env.secret_key, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Invalid Token"
        });
      } else {
        req.user = { id: decode.id };
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth API",
      error
    });
  }
};
