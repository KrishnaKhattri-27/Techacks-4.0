const mongoose = require("mongoose");

const policeStationSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

policeStationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("police_station", policeStationSchema);
