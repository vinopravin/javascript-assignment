// const Location = require('./../models/location.model'); //NOTE: Simplify into one
const State = require('./../models/states.model');

exports.getStates = (req, res) => {
    State.distinct("state", (err, states) => {
        if(err) {
            res.status(500).send({
                status: 0,
                message: 'problem with the server',
            })
        }else {
            res.status(200).send({
                status: 0,
                message: 'states obtained successfully',
                data: states
            })
        }
    })
}

exports.getCities = (req, res) => {
    let state = req.params.state
    if(state) {
        State.find({ state: state }, { '__v': 0},  (err,  location) => {
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

