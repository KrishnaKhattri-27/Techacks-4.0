const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());



app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
