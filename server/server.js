const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/userRoutes");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
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

app.post("/api/receiveImageChunk", (req, res) => {
  console.log(req.body.image_url, req.body.result);
  io.emit("messageFromServer", req.body.result, req.body.image_url);
  res.json({
    message: "Image received on the server",
  });
});

const PrisonerData = mongoose.model("Prisoner");
// const User = require("path_to_user_model"); // Replace with the actual path to your user model
const PoliceStation = require("./models/PoliceStation"); // Replace with the actual path to your police station model

app.post("/api/recievePrisoner", (req, res) => {
  const { name, photo, age, gender, history, location } = req.body;

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
        coordinates: [location.latitude, location.longitude],
      },
    });
    io.emit("messageFromFace", req.body);

    // 30.69412519311183, 76.72830050164539
    // 30.72580274915532, 76.6941414469853

    const userLatitude = location.latitude;
    const userLongitude = location.longitude;
    console.log(userLatitude, userLongitude);
    // console.log(dbconnect.getCollectionNames());
    // PoliceStation.findOne({
    //   location: {
    //     $nearSphere: {
    //       $geometry: {
    //         type: "Point",
    //         coordinates: [userLongitude, userLatitude],
    //       },
    //       $maxDistance: 716000,
    //     },
    //   },
    // })
    //   .exec()
    //   .then((nearestPoliceStation) => {
    //     console.log(nearestPoliceStation);
    //     if (nearestPoliceStation) {
    //       console.log("Nearest Police Station:", nearestPoliceStation.name);
    //     } else {
    //       console.log("No police station found nearby.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error finding nearest police station:", error);
    //   });
    // dbconnect.test.police_station.find({
    //   location: {
    //     $near: {
    //       $geometry: { type: "Point", coordinates: [-73.9667, 40.78] },
    //       $minDistance: 1000,
    //       $maxDistance: 10000,
    //     },
    //   },
    // });

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

// const { PoliceStation } = require("./models/PoliceStation"); // Update the path accordingly

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

const police_station = require("./models/PoliceStation"); // Replace with the actual path to your police station model

const logCollectionNames = async () => {
  try {
    // const collections = await mongoose.connection.db.listCollections()
    //   .toArray();

    // Extract and log the names of collections
    // const collectionNames = collections.map((collection) => collection.name);
    // console.log("Collection Names:", collectionNames[2]);

    // Log all documents from the 'police_station' collection
    // if (true) {
    const response = await police_station.find();

    // const response = await police_station.findOne({name:"City Police Station"});
    if (response) console.log("ok", response.length, "ok");
    else console.log("Documents in 'police_station' collection:", response);
    // } else {
    console.log("'police_station' collection not found");
    // }
  } catch (error) {
    console.error("Error fetching collection names:", error);
  } finally {
    // Close the MongoDB connection when done (optional)
    mongoose.connection.close();
  }
};

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  dbconnect();
  console.log(`Server Listening on Port ${PORT}`);
  // logCollectionNames();
});
