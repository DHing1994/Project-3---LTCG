// Create a map object.
let myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 2,
  layers: [],
});

// Add a tile layer.
let tile = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

let data = [];

fetch("./Output/countrydata.json").then((file) => {
  file.json().then((response) => {
    data = response;
    let countryScoreMarkers = [];
    let playerCountMarkers = [];
    let countryAverageScoreMarkers = [];

    Object.values(data).forEach((country) => {
      // Variables
      let playerCountColor = "";
      let countryScoreColor = "";

      if (country.playercount > 10000) {
        playerCountColor = "yellow";
      } else if (country.playercount > 5000) {
        playerCountColor = "blue";
      } else if (country.playercount > 2500) {
        playerCountColor = "green";
      } else {
        playerCountColor = "violet";
      }

      if (country.score > 10000) {
        countryScoreColor = "yellow";
      } else if (country.score > 5000) {
        countryScoreColor = "blue";
      } else if (country.score > 2500) {
        countryScoreColor = "green";
      } else {
        countryScoreColor = "violet";
      }

      if (country.playercount != 0) {
        playerCountMarkers.push(
          L.circle(country.coords, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: playerCountColor,
            radius: Math.sqrt(country.playercount) * 100000,
          }).bindPopup(
            `<h1>${country.country}</h1> <hr> <h3>Total Player Count: ${country.playercount}</h3> <h3>Player Count: ${country.playercount}</h3>`
          )
        );

        countryScoreMarkers.push(
          L.circle(country.coords, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: countryScoreColor,
            radius: Math.sqrt(country.score) * 10000,
          }).bindPopup(
            `<h1>${country.country}</h1> <hr> <h3>Total Championship Points: ${country.score}</h3> <h3>Player Count: ${country.playercount}</h3>`
          )
        );

        countryAverageScoreMarkers.push(
          L.circle(country.coords, {
            fillOpacity: 0.75,
            color: "blue",
            fillColor: "blue",
            radius: Math.sqrt(country.score / country.playercount) * 10000,
          }).bindPopup(
            `<h1>${country.country}</h1> <hr> <h3>Average Player Score: ${
              country.score / country.playercount
            }</h3>`
          )
        );
      }
    });

    let playerTotal = L.layerGroup(playerCountMarkers);
    let countryScores = L.layerGroup(countryScoreMarkers);
    let countryAverageScores = L.layerGroup(countryAverageScoreMarkers);
    let overlayMaps = {
      // "Player Count": players,
      "Total Player Score": countryScores,
      "Total Player Count": playerTotal,
      "Average Player Score": countryAverageScores,
    };
    myMap.options.layers.push(countryScores, playerTotal, countryAverageScores);

    // Pass our map layers to our layer control.
    // Add the layer control to the map.
    let baseMaps = {
      Map: tile,
    };
    L.control
      .layers(baseMaps, overlayMaps, {
        collapsed: false,
      })
      .addTo(myMap);
  });
});
