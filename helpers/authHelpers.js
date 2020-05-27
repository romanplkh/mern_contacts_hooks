const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.sendToken = async (user, res) => {
  //SEND TOKEN TO USER
  const payload = {
    user: {
      id: user.id,
    },
  };

  //We will only return token, userId already will be in token
  jwt.sign(
    payload,
    config.get("jwtSecret"),
    {
      expiresIn: 3600,
    },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
};
