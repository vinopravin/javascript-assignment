const router = require('express').Router();
const RestaurantController = require('./../controllers/restaurant.controllers');

router.route('/')
    .get(RestaurantController.getRestaurants)
    .put(RestaurantController.updateRestaurant)

router.route('/city/:cityName')
    .get(RestaurantController.getRestaurants)

router.route('/:restaurantId')
    .get(RestaurantController.getSingleRestaurants)
    .delete(RestaurantController.removeRestaurant)

module.exports = router