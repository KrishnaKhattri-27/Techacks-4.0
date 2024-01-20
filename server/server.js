const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/userRoutes");
const http = require("http");
const connectDB = require("./utils/database");
const cors = require("cors");
// const { Server } = require("socket.io"); // Import Server from socket.io
const dbconnect = require("./config/database");
require("./models/PrisonerData");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
// });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1", routes);


// Socket.IO connection event
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("messageFromFrontend", (message) => {
//     console.log("Message from frontend:", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// app.post("/api/receiveImageChunk", (req, res) => {
//   console.log(req.body.image_url, req.body.result);
//   io.emit("messageFromServer", req.body.result, req.body.image_url);
//   res.json({
//     message: "Image received on the server",
//   });
// });

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
    });

    res.json({
      message: "Data of Prisoner received on the server",
    });
  } catch (err) {
    console.log("Failed To Create Schema", err);
    res.status(500).json({ error: "Failed to create schema" });
  }
});

// app.post("/api/recieveTrafficNumber", (req, res) => {
//   console.log(req.body.number);
//   io.emit("messageFromTraffic", req.body.number);
//   res.json({
//     message: "Traffic Number received on the server",
//   });
// });

app.post("/api/recieveActivityPrediction", (req, res) => {
  console.log(req.body.prediction);
  // io.emit("messageFromActivity", req.body.prediction);
  res.json({
    message: "ACtivity predictions received on the server",
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  dbconnect();
  console.log(`Server Listening on Port ${PORT}`);
});
