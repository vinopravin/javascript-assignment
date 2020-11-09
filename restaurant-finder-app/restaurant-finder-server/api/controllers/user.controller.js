const User = require('./../models/user.model');

exports.updateUser = (req, res) => {
    let userDetails = req.body;
    if(userDetails._id) {
        // existing user, update it
        User.findOne({ _id: userDetails._id }, (err, existingUser) =>{
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error updating user',
                    error: 'problem with the server'
                })
            } else if(!existingUser){
                res.status(401).send({
                    status: 0,
                    message: 'parameters are not valid',
                    error: 'invalid parameters'
                })
            } else {
                let user = existingUser.set(userDetails);
                user.save((err, updatedUser) => {
                    if(err) {
                        res.status(500).send({
                            status: 0,
                            message: 'error adding user',
                            error: 'problem with the server'
                        })
                    } else {
                        res.status(201).send({
                            status: 1,
                            message: 'updated successfully'
                        })
                    }
                })
            }
        })
    } else {
        // new user, save it
        let user = new User(userDetails);

        user.save((err, savedUser) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error adding user',
                    error: 'problem with the server'
                })
            }else{
                res.status(201).send({
                    status: 1,
                    message: 'user added successfully',
                })
            }
        })
    }
}

exports.getUsers = (req, res) => {
    User.find({}, { '__v' : 0, 'password': 0 }, (err, users) => {
        if(err) {
            res.status(500).send({
                status: 0,
                message: 'problem with the server',
            })
        }else {
            res.status(200).send({
                status: 0,
                message: 'users obtained successfully',
                data: users
            })
        }
    })
}

exports.getSingleUser = (req, res) => {
    let userId = req.params.userId
    if(userId) {
        User.findOne({_id: userId }, { '__v': 0,  'password': 0 },  (err,  user) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error getting user',
                    error: 'problem with the server'
                })
            }else if(!user) {
                res.status(401).send({
                    status: 0,
                    message: 'error getting user',
                    error: 'invalid parameters'
                })
            }else {
                res.status(200).send({
                    status: 1,
                    message: 'user obtained successfully',
                    data: user
                })
            }
        })
    } else {
        res.status(401).send({
            status: 0,
            message: 'error getting user',
            error: 'insufficient parameters'
        })
    }
}

exports.removeUser = (req, res) => {
    let userId = req.params.userId;

    if(!userId) {
        res.status(401).send({
            status: 0,
            message: 'invalid paramter',
            error: 'insfficient paramters'
        })
    } else {
        User.remove({ _id: userId },  (err, queryResult) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error removing user',
                    error: 'problem with the server'
                })
            } else {
                if(queryResult.deletedCount) {
                    res.status(201).send({
                        status: 1,
                        message: 'user removed successfully'
                    })
                } else {
                    res.status(400).send({
                        status: 0,
                        message: 'user not exists',
                        error: 'invalid user'
                    })
                }
            }
        })
    }
}