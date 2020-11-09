const router = require('express').Router();
const ServicesController = require('./../controllers/services.controller')

router.route('/states')
    .get(ServicesController.getStates)

router.route('/cities/:state')
    .get(ServicesController.getCities)

module.exports = router;