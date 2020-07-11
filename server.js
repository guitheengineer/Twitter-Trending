require("dotenv").config();
const express = require("express");
const twit = require("twitter");
const woeid = require("woeid");
const path = require("path");
const twitter = new twit({
  consumer_key: process.env.API_CONSUMER,
  consumer_secret: process.env.API_CONSUMER_SECRET,
  access_token_key: process.env.API_ACCESS_TOKEN,
  access_token_secret: process.env.API_ACCESS_TOKEN_SECRET,
});
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/trends/:place", (req, res) => {
  if (req.params.place) {
    if (req.params.place == "1") {
      const params = { id: "1" };
      twitter.get("trends/place", params, function (error, data, response) {
        res.json(data);
        console.log(data, "data");
      });
    } else {
      const getWoeid = woeid.getWoeid(
        req.params.place
          .toLowerCase()
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
      ).woeid;
      const params = { id: getWoeid };
      console.log(getWoeid);
      console.log(req.params.place, "req<<");
      twitter.get("trends/place", params, function (error, data, response) {
        res.json(data);
      });
    }
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
