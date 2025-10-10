const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// add new user (Register)
const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // email check
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    // password match
    const passwordCheck = await bcrypt.compare(password, checkUser.password);
    if (!passwordCheck) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    // create jwt token
    const accessToken = jwt.sign(
      {
        id: checkUser._id,
        userName: checkUser.userName,
        role: checkUser.role,
        email: checkUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      {
        id: checkUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // sameSite: "None",
      secure: false,
      // maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: true,
      message: "Login successfully",
      accessToken,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { registerUser, loginUser };
