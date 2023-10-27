const { validationResult } = require("express-validator");
const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../helper/authHelper");

const signUp = async (req, res) => {
  try {
    //check all validation of request or user details
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { name, email, address, phone, password } = req.body;
      //check user
      const isExist = await User.findOne({ email });
      console.log(isExist);
      if (isExist && isExist.length !== 0) {
        return res.json({
          success: false,
          msg: "Already Have an account Please login",
        });
      }
      const hashedPassword = await hashPassword(password);
      // storing user
      const newUser = await User.create({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      });
      const token = generateToken({ email });
      newUser.save(); //save in database
      return res.status(201).json({
        success: true,
        msg: "signup success",
        user: {
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          role: newUser.role,
        },
        token,
      });
    } else {
      res.status(500).json({
        success: false,
        message: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const login = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(422).json({
          success: false,
          msg: "Invalid credentials",
        });
      }
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(422).json({
          success: false,
          msg: "Invalid credentials",
        });
      }
      const token = generateToken({ email });
      res.json({
        success: true,
        msg: "login success",
        token,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Internal server error while login",
        error: error,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      err: result,
    });
  }
};

module.exports = { signUp, login };
