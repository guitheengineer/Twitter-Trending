require("dotenv").config();
const express = require("express");
const twit = require("twitter");
const path = require("path");
const { getSingleWOEID } = require("./getSingleWoeid");

const twitter = new twit({
  consumer_key: process.env.API_CONSUMER,
  consumer_secret: process.env.API_CONSUMER_SECRET,
  access_token_key: process.env.API_ACCESS_TOKEN,
  access_token_secret: process.env.API_ACCESS_TOKEN_SECRET,
});
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/trends/:place", (req, res) => {
  const id = getSingleWOEID(req.params.place);
  twitter.get("trends/place", { id }, function (error, data) {
    const currentTrendings = data[0].trends;
    res.json(currentTrendings);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
