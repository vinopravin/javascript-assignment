const router = require('express').Router();
const UserController = require('./../controllers/user.controller');

router.route('/')
    .get(UserController.getUsers)
    .put(UserController.updateUser)

router.route('/:userId')
    .get(UserController.getSingleUser)
    .delete(UserController.removeUser)

module.exports = router;