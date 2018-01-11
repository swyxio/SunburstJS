"use strict"; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const bodyParser = require("body-parser");
const express = require("express");
const { schema } = require("./schema");
const app = express();
const port = process.env.PORT || 5000; // process.env.PORT is useful for heroku deploy

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Expres2s" });
});
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(port, () => console.log(`Listening on port ${port}`));
