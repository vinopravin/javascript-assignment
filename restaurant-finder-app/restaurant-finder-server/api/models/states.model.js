const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name: String,
    state: String
});

module.exports = mongoose.model('states', stateSchema)

