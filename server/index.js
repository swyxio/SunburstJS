"use strict"; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000; // process.env.PORT is useful for heroku deploy
const path = require("path");

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Expres2s" });
});

app.use(express.static(path.join(__dirname, "../client/build/")));

// /* this is the catchall to deliver index.html */
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
