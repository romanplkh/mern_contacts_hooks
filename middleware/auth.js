const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get token from header

  const token = req.header("x-auth-token");

  //Check if token exist

  if (!token) {
    return res.status(401).json({ msg: "Forbidden" });
  }

  try {
    //Verify token
    //Token contains object with id of the user
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Set object user to request object, so it is available with each request
    req.user = decoded.user;

    next();
  } catch (error) {
    //If jwt could not decode token
    res.status(401).json({ msg: "Forbidden" });
  }
};
