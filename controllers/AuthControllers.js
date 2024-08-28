require("dotenv").config();
let User = require("../models/User");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    let bcryptPassword = await bcrypt.hash(password, 10);
    let newUser = new User({ name, email, password: bcryptPassword });
    await newUser.save();
    res.status(201).json({ message: "Signup successful", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

let login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    let jwtToken = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
    res
      .status(200)
      .json({ message: "Login successful", success: true, jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
let refresh = async (req, res) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token login again" });
      }
      res.status(200).json({ success: true, message: "Token is valid" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { signup, login, refresh };
