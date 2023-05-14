const jwt = require("jsonwebtoken");
//to let to the pages where user sign is required
const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = requireSignIn;
