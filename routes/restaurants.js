const express = require("express");

const uuid = require("uuid");
const resData = require("../util/restaurant-data"); // How you express a path in NodeJS in such a require statement

const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order === "desc") {
    nextOrder = "asc";
  }

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants(); // To get the path and read the JSON file

  restaurants.push(restaurant);

  resData.storeRetaurants(restaurants); // To write de restaurant in the JSON file

  res.redirect("/confirm");
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantsId = req.params.id;

  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantsId) {
      return res.render("details", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
