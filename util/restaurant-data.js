const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRetaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRetaurants: storeRetaurants,
};

