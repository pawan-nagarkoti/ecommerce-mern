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
  })
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

const { authMiddleware } = require("./controller/auth.controller");
const { authorize } = require("./middlewares/auth.middleware");

app.use("/auth", authRoutes);
app.use("/feature", authMiddleware, featureRoutes);
app.use("/product", authMiddleware, productRoutes);
app.use("/cart", authMiddleware, authorize("admin", "user"), cartRoutes);
app.use("/address", authMiddleware, authorize("admin", "user"), addressRoutes);
app.use("/order", authMiddleware, orderRoutes);
app.use("/search", authMiddleware, searchRoutes);
app.use("/review", authMiddleware, authorize("user", "admin"), reviewRoutes);
app.use("/coupon", authMiddleware, couponRoutes);

connectToDB();

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
