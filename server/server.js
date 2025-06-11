const express = require("express");
require("dotenv").config(); // load env file
const connectToDB = require("./database/db");
const app = express();
const port = process.env.PORT;
connectToDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    data: books,
    message: "done",
  });
});

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
