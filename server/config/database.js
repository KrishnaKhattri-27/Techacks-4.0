const { error } = require("console");
const mongoose = require("mongoose");
require("dotenv").config();

const police_station = require("../models/PoliceStation"); // Replace with the actual path to your police station model

const dbconnect = async () => {
  try {
    const url = process.env.URL;
    await mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database connected");
    // await logCollectionNames();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = dbconnect;
