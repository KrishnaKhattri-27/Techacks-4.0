const mongoose = require("mongoose");

const PrisonerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  age: Number,
  date: Date,
  gender: String,
  history: String,
});

module.exports = mongoose.model("Prisoner", PrisonerSchema);
