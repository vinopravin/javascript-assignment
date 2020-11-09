const router = require('express').Router();
const LocationController  = require('./../controllers/location.controller')

// router.route('/list')
//     .get(LocationController.getLocations)

router.route('/')
    .get(LocationController.getLocations)
    .put(LocationController.updateLocation)

router.route('/:locationId')
    .get(LocationController.getSingleLocation)
    .delete(LocationController.removeLocations)

module.exports = router;