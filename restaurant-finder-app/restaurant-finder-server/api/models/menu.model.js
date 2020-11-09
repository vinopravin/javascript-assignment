const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: String,
    description: String,
    restaurant_id: String
});

module.exports = mongoose.model('menus', menuSchema)