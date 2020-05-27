const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { sendToken } = require("../helpers/authHelpers");

//POST
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //SAVE USER IN DB
    await user.save();

    //Send token to user
    sendToken(user, res);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ exception: "Something bad happened. Cannot process request" });
  }
};
