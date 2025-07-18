const express = require("express");
require("dotenv").config(); // load env file
const connectToDB = require("./database/db");
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

const featureRoutes = require("./routes/feature.route");
const productRoutes = require("./routes/product.route");

app.use("/feature", featureRoutes);
app.use("/product", productRoutes);

connectToDB();

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
