const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    //Mongodb atlas URL
    // await mongoose.connect(process.env.MONGODB_URL);

    // Mongodb local URL
    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB}`);
    console.log("MongoDB connected successfully!");
  } catch (e) {
    console.log(e.message);
    console.log("something is wrong while connection mongoDB");
  }
};

module.exports = connectToDB;
