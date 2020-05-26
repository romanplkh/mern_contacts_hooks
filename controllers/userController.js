const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//POST
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
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
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server errror");
  }
};
