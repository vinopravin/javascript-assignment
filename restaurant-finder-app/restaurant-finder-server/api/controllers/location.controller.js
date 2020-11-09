const Location = require('./../models/location.model');

exports.updateLocation = (req, res) => {
    let locationDetails = req.body;
    if(locationDetails._id) {
        // existing location, update it
        Location.findOne({ _id: locationDetails._id }, (err, existingLocation) =>{
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error updating location',
                    error: 'problem with the server'
                })
            } else if(!existingLocation){
                res.status(401).send({
                    status: 0,
                    message: 'parameters are not valid',
                    error: 'invalid parameters'
                })
            } else {
                let location = existingLocation.set(locationDetails);
                location.save((err, updatedLocation) => {
                    if(err) {
                        res.status(500).send({
                            status: 0,
                            message: 'error adding location',
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
        // new location, save it
        let location = new Location(locationDetails);

        location.save((err, savedLocation) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error adding location',
                    error: 'problem with the server'
                })
            }else{
                res.status(201).send({
                    status: 1,
                    message: 'location added successfully',
                })
            }
        })
    }
}

exports.getLocations = (req, res) => {
    Location.find({}, { '__v' : 0 }, (err, locations) => {
        if(err) {
            res.status(500).send({
                status: 0,
                message: 'problem with the server',
            })
        }else {
            res.status(200).send({
                status: 0,
                message: 'locations obtained successfully',
                data: locations
            })
        }
    })
}

exports.getSingleLocation = (req, res) => {
    let locationId = req.params.locationId
    if(locationId) {
        Location.findOne({_id: locationId }, { '__v': 0},  (err,  location) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error getting locaion',
                    error: 'problem with the server'
                })
            }else if(!location) {
                res.status(401).send({
                    status: 0,
                    message: 'error getting location',
                    error: 'invalid parameters'
                })
            }else {
                res.status(200).send({
                    status: 1,
                    message: 'location obtained successfully',
                    data: location
                })
            }
        })
    } else {
        res.status(401).send({
            status: 0,
            message: 'error getting location',
            error: 'insufficient parameters'
        })
    }
}

exports.removeLocations = (req, res) => {
    let locationId = req.params.locationId;

    if(!locationId) {
        res.status(401).send({
            status: 0,
            message: 'invalid paramter',
            error: 'insfficient paramters'
        })
    } else {
        Location.deleteOne({ _id: locationId },  (err, queryResult) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error removing location',
                    error: 'problem with the server'
                })
            } else {
                if(queryResult.deletedCount) {
                    res.status(201).send({
                        status: 1,
                        message: 'location removed successfully'
                    })
                } else {
                    res.status(400).send({
                        status: 0,
                        message: 'location not exists',
                        error: 'invalid location'
                    })
                }
            }
        })
    }
}