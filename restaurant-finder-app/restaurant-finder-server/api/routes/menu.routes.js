const router = require('express').Router();
const MenuController  = require('./../controllers/menu.controllers')

router.route('/')
    .get(MenuController.getMenu)
    .put(MenuController.updateMenuItem)

router.route('/:itemId')
    .get(MenuController.getMenuItem)
    .delete(MenuController.removeMenuItem)

router.route('/restaurant/:restaurantId')
    .get(MenuController.getMenuOfRestaurant)

module.exports = router;