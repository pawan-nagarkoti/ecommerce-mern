const express = require("express");
require("dotenv").config(); // load env file
const connectToDB = require("./database/db");
const app = express();
const port = process.env.PORT;

const featureRoutes = require("./routes/feature-route");

app.use(express.json());

app.use("/feature", featureRoutes);

connectToDB();

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
