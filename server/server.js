const express = require("express");
require("dotenv").config(); // load env file
const connectToDB = require("./database/db");
const app = express();
const cors = require("cors");
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

const featureRoutes = require("./routes/feature.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const authRoutes = require("./routes/auth.route");

app.use("/feature", featureRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);

connectToDB();

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
