require("dotenv").config();
const express = require("express");
const twit = require("twitter");
const woeid = require("woeid");

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
    if (req.params.place === "1") {
      const params = { id: "1" };
      console.log(req.params.place, "req<<");
      twitter.get("trends/place", params, function (error, data, response) {
        res.json(data);
      });
    } else {
      const getWoeid = woeid.getWoeid(req.params.place).woeid;
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
  app.use(favicon(path.join(dirname, "build", "favicon.ico")));
  app.use(express.static(path.join(dirname, "build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
