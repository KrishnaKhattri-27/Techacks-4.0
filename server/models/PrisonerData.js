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
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

PrisonerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Prisoner", PrisonerSchema);
