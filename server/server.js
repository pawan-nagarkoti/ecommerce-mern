const express = require("express");
require("dotenv").config(); // load env file
const connectToDB = require("./database/db");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const cookieParser = require("cookie-parser");

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN, // don't add * here because we are using cookies
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const authRoutes = require("./routes/auth.route");
const featureRoutes = require("./routes/feature.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const addressRoutes = require("./routes/address.route");
const orderRoutes = require("./routes/order.route");
const searchRoutes = require("./routes/search.route");
const reviewRoutes = require("./routes/review.route");
const couponRoutes = require("./routes/coupon.route");
const dashboardRoutes = require("./routes/dashboard.route");

const { authMiddleware } = require("./controller/auth.controller");
const { authorize } = require("./middlewares/auth.middleware");
const mongoose = require("mongoose");
let isConnected = false;

async function connectToMongoDb() {
  if (isConnected) return;

  try {
    console.log("Attempting MongoDB connection...");
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000, // Fast fail
      maxPoolSize: 10, // Connection pool
    });
    isConnected = true;
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
      isConnected = false;
    });
    console.log("MongoDB connected successfully!");
  } catch (e) {
    console.error("MongoDB connection failed:", e.message);
    isConnected = false;
  }
}

// Connect ONCE at startup (best practice)
connectToMongoDb();

// Simple middleware check (non-blocking)
app.use((req, res, next) => {
  if (!isConnected) {
    console.log("DB not ready, but proceeding...");
  }
  next();
});

app.use("/auth", authRoutes);
app.use("/feature", authMiddleware, featureRoutes);
app.use("/product", authMiddleware, productRoutes);
app.use("/cart", authMiddleware, authorize("admin", "user"), cartRoutes);
app.use("/address", authMiddleware, authorize("admin", "user"), addressRoutes);
app.use("/order", authMiddleware, orderRoutes);
app.use("/search", authMiddleware, searchRoutes);
app.use("/review", authMiddleware, authorize("user", "admin"), reviewRoutes);
app.use("/coupon", authMiddleware, couponRoutes);
app.use("/dashboard", authMiddleware, authorize("admin"), dashboardRoutes);

// connectToDB();

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});

// this code is used for versal deploylment
// start ----
// let isConnected = false;
// async function connectToMongoDb() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     isConnected = true;
//     console.log("MongoDB connected successfully!");
//   } catch (e) {
//     console.log(e.message);
//     console.log("something is wrong while connection mongoDB");
//   }
// }

// app.use((req, res, next) => {
//   if (!isConnected) {
//     connectToMongoDb();
//   }
//   next();
// });

// module.exports = app;
//---- end
