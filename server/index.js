"use strict"; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000; // process.env.PORT is useful for heroku deploy
const path = require("path");
const mongo = require("mongodb").MongoClient;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/sunburstjs", { useMongoClient: true }); // :27017
mongoose.Promise = global.Promise;

var ClickModel = mongoose.model("ClickCounter", { counter: Number });

// mongo.connect("mongodb://localhost:27017/sunburstjs", function(err, db) {
//   if (err) throw new Error("Database failed to connect!");
//   else console.log("MongoDB successfully connected on port 27017.");

// });
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/click", async (req, res) => {
  console.log("POST api/click", req.body);
  var newUpdate = new ClickModel({ counter: req.body.counter });
  await newUpdate.save(function(err, updatedCounter) {
    if (err) return console.error(err);
    res.json({ updatedCounter });
  });
});
app.get("/api/reset", (req, res) => {
  console.log("GET api/reset");
  ClickModel.deleteMany().then(res.send(200));
});
app.get("/api/click", async (req, res) => {
  console.log("GET api/click");
  await ClickModel.find(function(err, counter) {
    if (err) return console.error(err);
    if (counter) res.json(counter.length);
    else res.json(0);
  });
});

app.use(express.static(path.join(__dirname, "../client/build/")));

// /* this is the catchall to deliver index.html */
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
