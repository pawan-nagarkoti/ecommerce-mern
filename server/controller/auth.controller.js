const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transporter } = require("../utils/mailer");
const { generateOtp } = require("../utils/otp");
const { otpHtmlTemplate } = require("../utils/emailTemplate");

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
      // maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    return res.status(200).json({
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

// refresh token
const refreshToken = async (req, res) => {
  try {
    if (req.cookies.refreshToken) {
      const refreshToken = req.cookies.refreshToken;
      // verify token
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decode) => {
          if (err) {
            // Wrong Refesh Token
            return res.status(406).json({ message: "Unauthorized" });
          } else {
            const user = await User.findOne({ _id: decode.id });
            // Correct token we send a new access token
            const accessToken = jwt.sign(
              {
                id: user._id,
                userName: user.userName,
                role: user.role,
                email: user.email,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
              }
            );
            return res.json({ accessToken });
          }
        }
      );
    } else {
      return res.status(406).json({ message: "Unauthorized" });
    }
  } catch (e) {
    console.log(e.message);
  }
};

// logout
const logoutUser = async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }
  return res.clearCookie("refreshToken").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded; // e.g. { id, role, userName, email }
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Access token expired" });
    }
    if (err.name === "JsonWebTokenError" || err.name === "NotBeforeError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });
    }
    return next(err);
  }
};

// this is example how we can use authmiddleware and get data from that autheraization token which we are sending from frontent level
// app.get("/api/user/profile", authMiddleware, (req, res) => {
//   console.log(req.user); // 👈 decoded data from token
//   res.json({ message: "Profile data", user: req.user });
// });

// You can use it in three ways, depending on your needs:

// Level	Example	Description
// Route level	router.get("/profile", authMiddleware, handler)	Protects one route
// Router level	router.use(authMiddleware)	Protects all routes in that router
// App level	app.use(authMiddleware)	Protects the whole app (rarely used for all routes)

const restPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const loginUserId = req.user.id;

    const existingPassword = await User.find({ _id: loginUserId });

    // password match
    const passwordCheck = await bcrypt.compare(
      oldPassword,
      existingPassword[0].password
    );

    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    } else {
      const hashPassword = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(
        loginUserId,
        {
          password: hashPassword,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "password is updated",
      });
    }
  } catch (e) {
    console.log(e.message);
    return req.res(500).json({
      message: "something is wrong while creating reset password",
    });
  }
};

const sendMailForOtp = async (req, res) => {
  const otp = generateOtp(6);

  // Expire time (10 minutes)
  const expiresInMinutes = 10;
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000); // timestamp 10 min later

  try {
    const { email } = req.body;
    if (otp) {
      await transporter.sendMail({
        from: "pawan@gmail.com",
        to: "user@gmail.com, test@gmail.com",
        subject: "Testing email subject",
        text: "Testing email text",
        html: otpHtmlTemplate({
          otp,
          expiresInMinutes,
          appName: "Ecommerce application",
        }),
      });

      const findUserByMail = await User.find({ email });
      await User.findByIdAndUpdate(
        { _id: findUserByMail[0]._id },
        {
          otp,
          expiresAt,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "OTP sended in mail",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "something is error",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.query;
    const findUser = await User.find({ email });

    if (findUser[0].expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (Number(otp) !== findUser[0].otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    return res.status(200).json({
      success: true,
      message: "login successfully",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "something error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  authMiddleware,
  restPassword,
  sendMailForOtp,
  verifyOtp,
};
