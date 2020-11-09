const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    address: {
        street_name: String,
        locality: String,
        city: String,
        state: String,
        country: String
    },
    cuisines: [String]
});

module.exports = mongoose.model('restaurants', restaurantSchema)

