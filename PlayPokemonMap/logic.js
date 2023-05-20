// Create a map object.
let myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 2,
});

// Add a tile layer.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

fetch("./playerdata.json").then((file) => {
  file.json().then((response) => {
    console.log(response);
  });
});
