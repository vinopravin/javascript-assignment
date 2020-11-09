const Menu = require('../models/menu.model');

exports.getMenu = (req, res) => {
    Menu.find({}, { '__v': 0},  (err,  menu) => {
        if(err) {
            res.status(500).send({
                status: 0,
                message: 'error getting menu',
                error: 'problem with the server'
            })
        }else {
            res.status(200).send({
                status: 1,
                message: 'menu obtained successfully',
                data: menu
            })
        }
    })
}

exports.getMenuOfRestaurant = (req, res) => {
    let restaurantId = req.params.restaurantId
    if(restaurantId) {
        Menu.find({ restaurant_id: restaurantId }, { '__v': 0},  (err,  menu) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error getting menu',
                    error: 'problem with the server'
                })
            }else if(!menu) {
                res.status(401).send({
                    status: 0,
                    message: 'error getting menu',
                    error: 'invalid parameters'
                })
            }else {
                res.status(200).send({
                    status: 1,
                    message: 'menu obtained successfully',
                    data: menu
                })
            }
        })
    } else {
        res.status(401).send({
            status: 0,
            message: 'error getting menu item',
            error: 'insufficient parameters'
        })
    }
}

exports.getMenuItem = (req,res) => {
    let itemId = req.params.itemId
    if(itemId) {
        Menu.findOne({_id: itemId }, { '__v': 0},  (err,  item) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error getting menu item',
                    error: 'problem with the server'
                })
            }else if(!item) {
                res.status(401).send({
                    status: 0,
                    message: 'error getting menu item',
                    error: 'invalid parameters'
                })
            }else {
                res.status(200).send({
                    status: 1,
                    message: 'menu item obtained successfully',
                    data: item
                })
            }
        })
    } else {
        res.status(401).send({
            status: 0,
            message: 'error getting menu item',
            error: 'insufficient parameters'
        })
    }
}

exports.updateMenuItem = (req,res) => {
    let menuItemDetails = req.body;
    if(menuItemDetails._id) {
        // existing menu item, update it;
        Menu.findOne({ _id: menuItemDetails._id }, (err, existingMenuItem) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error updating menu item',
                    error: 'problem with the server'
                })
            } else if(!existingMenuItem) {
                res.status(401).send({
                    status: 0,
                    message: 'parameters are not valid',
                    error: 'invalid parameters'
                })
            } else {
                let item = existingMenuItem.set(menuItemDetails);
                item.save((err, updatedMenuItem) => {
                    if(err) {
                        res.status(500).send({
                            status: 0,
                            message: 'error adding menu item',
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
        // new menu item, save it
        let item = new Menu(menuItemDetails);

        item.save((err, savedMenuItem) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error adding menu item',
                    error: 'problem with the server'
                })
            }else{
                res.status(201).send({
                    status: 1,
                    message: 'menu item added successfully',
                })
            }
        })
    }
}

exports.removeMenuItem = (req,res) => {
    let itemId = req.params.itemId
    if(itemId) {
        Menu.remove({_id: itemId },  (err, queryResult) => {
            if(err) {
                res.status(500).send({
                    status: 0,
                    message: 'error removing menu item',
                    error: 'problem with the server'
                })
            }else {
                if(queryResult.deletedCount) {
                    res.status(201).send({
                        status: 1,
                        message: 'menu item removed successfully'
                    })
                } else {
                    res.status(400).send({
                        status: 0,
                        message: 'menu item not exists',
                        error: 'invalid menu item'
                    })
                }
            }
        })
    } else {
        res.status(401).send({
            status: 0,
            message: 'error getting menu',
            error: 'insufficient parameters'
        })
    }
}