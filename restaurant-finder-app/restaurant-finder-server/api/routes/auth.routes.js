const router = require('express').Router();
const AuthController = require('./../controllers/auth.controllers');

router.route('/login')
    .post(AuthController.loginUser)

module.exports = router;