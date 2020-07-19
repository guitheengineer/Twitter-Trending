// Simplified version of Twitter-WOEID package by @vishnumohanrk

const countryWOEIDS = require("./countryWOEIDS");

const getSingleWOEID = (cityName) => {
  let data = countryWOEIDS.filter(
    (i) => i.name.toLowerCase() === cityName.toLowerCase()
  );
  return data[0].woeid;
};

module.exports = { getSingleWOEID };
