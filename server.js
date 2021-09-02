/**
 * Static HTTP Server
 *
 * Create a static file server instance to serve files
 * and folder in the './public' folder
 */

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

express.static.mime.define({ "application/octet-stream": ["gltf"] });

// Setting up the public directory
app.use(express.static("public"));

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
