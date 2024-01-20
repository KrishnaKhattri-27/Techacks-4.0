const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/userRoutes");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); // Import Server from socket.io
const dbconnect = require("./config/database");
require("./models/PrisonerData");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use("/v1", routes);

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("messageFromFrontend", (message) => {
    console.log("Message from frontend:", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PrisonerData = mongoose.model("Prisoner");

app.post("/api/recievePrisoner", (req, res) => {
  const { name, photo, age, gender, history } = req.body;

  try {
    PrisonerData.create({
      name: name,
      photo: photo,
      age: age,
      date: new Date(),
      gender: gender,
      history: history,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
    });

    res.json({
      message: "Data of Prisoner received on the server",
    });
  } catch (err) {
    console.log("Failed To Create Schema", err);
    res.status(500).json({ error: "Failed to create schema" });
  }
});

app.post("/api/recieveTrafficNumber", (req, res) => {
  console.log(req.body.number);
  io.emit("messageFromTraffic", req.body.number);
  res.json({
    message: "Traffic Number received on the server",
  });
});

app.post("/api/recieveActivityPrediction", (req, res) => {
  console.log(req.body.prediction);
  io.emit("messageFromActivity", req.body.prediction);
  res.json({
    message: "ACtivity predictions received on the server",
  });
});

const { PoliceStation } = require("./models/PoliceStation"); // Update the path accordingly

app.post("/api/findNearestPoliceStation", async (req, res) => {
  const { userLocation } = req.body;

  try {
    const nearestPoliceStation = await PoliceStation.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [userLocation.longitude, userLocation.latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    if (!nearestPoliceStation) {
      return res
        .status(404)
        .json({ message: "No police station found nearby." });
    }

    res.json({
      message: "Nearest police station found.",
      data: nearestPoliceStation,
    });
  } catch (err) {
    console.error("Error finding nearest police station:", err);
    res.status(500).json({ error: "Failed to find nearest police station." });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  dbconnect();
  console.log(`Server Listening on Port ${PORT}`);
});
