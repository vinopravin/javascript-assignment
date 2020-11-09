const Restaurant = require('../models/restaurant.model');

exports.getRestaurants = (req, res) => {
    let query = {};
    if(req.params.cityName) {
        query = {
            'address.city': req.params.cityName
        }
    }
    Restaurant.find(query, { '__v': 0},  (err,  restaurants) => {
        if(err) {
            res.status(500).send({
                status: 0,
                message: 'error getting restaurants',
                error: 'problem with the server'
            })
        }else {
            res.status(200).send({
                status: 1,
                message: 'restaurants obtained successfully',
                data: restaurants
            })
        }
    })
}

exports.getSingleRestaurants = (req,res) => {
    let restaurantId = req.params.restaurantId
    if(restaurantId) {
        Restaurant.findOne({_id: restaurantId }, { '__v': 0},  (err,  restaurant) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error getting restaurant',
                    error: 'problem with the server'
                })
            }else if(!restaurant) {
                res.status(401).send({
                    status: 0,
                    message: 'error getting restaurant',
                    error: 'invalid parameters'
                })
            }else {
                res.status(200).send({
                    status: 1,
                    message: 'restaurant obtained successfully',
                    data: restaurant
                })
            }
        })
    } else {
        res.status(401).send({
            status: 0,
            message: 'error getting restaurant',
            error: 'insufficient parameters'
        })
    }
}

exports.updateRestaurant = (req,res) => {
    let restaurantDetails = req.body;
    if(restaurantDetails._id) {
        // existing restaurant, update it;
        Restaurant.findOne({ _id: restaurantDetails._id }, (err, existingRestaurant) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error updating restaurant',
                    error: 'problem with the server'
                })
            } else if(!existingRestaurant) {
                res.status(401).send({
                    status: 0,
                    message: 'parameters are not valid',
                    error: 'invalid parameters'
                })
            } else {
                let restaurant = existingRestaurant.set(restaurantDetails);
                restaurant.save((err, updatedRestaurant) => {
                    if(err) {
                        res.status(500).send({
                            status: 0,
                            message: 'error adding restaurant',
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
    }else {
        // new restaurant, save it
        let restaurant = new Restaurant(restaurantDetails);

        restaurant.save((err, savedRestaurant) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error adding restaurant',
                    error: 'problem with the server'
                })
            }else{
                res.status(201).send({
                    status: 1,
                    message: 'restaurant added successfully',
                })
            }
        })
    }
}

exports.removeRestaurant = (req,res) => {
    let restaurantId = req.params.restaurantId
    if(restaurantId) {
        Restaurant.remove({_id: restaurantId },  (err, queryResult) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error removing restaurant',
                    error: 'problem with the server'
                })
            }else {
                if(queryResult.deletedCount) {
                    res.status(201).send({
                        status: 1,
                        message: 'restaurant removed successfully'
                    })
                } else {
                    res.status(400).send({
                        status: 0,
                        message: 'restaurant not exists',
                        error: 'invalid restaurant'
                    })
                }
            }
        })
    } else {
        res.status(401).send({
            status: 0,
            message: 'error getting restaurants',
            error: 'insufficient parameters'
        })
    }
}