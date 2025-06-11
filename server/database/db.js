const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully!");
  } catch (e) {
    console.log(e.message);
    console.log("something is wrong while connection mongoDB");
  }
};

module.exports = connectToDB;
