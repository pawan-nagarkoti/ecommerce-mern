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
  res.clearCookie("refreshToken").json({
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

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  authMiddleware,
};
