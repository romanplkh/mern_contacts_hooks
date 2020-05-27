const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { sendToken } = require("../helpers/authHelpers");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return sendErrorMessage("Invalid email or password", res);
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendErrorMessage("Invalid email or password", res);
    }

    //Send token to user
    sendToken(user, res);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send({ exception: "Something bad happened. Cannot process request" });
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    //If user authenticated our request object will have user attached to it with id
    //Return all data about user except for password
    const { id } = req.user;
    const user = await User.findOne({ _id: id }).select("-password");

    res.status(200).json({ payload: user });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ exception: "Something bad happened. Cannot process request" });
  }
};

function sendErrorMessage(msg, res) {
  return res.status(400).json({ msg });
}
