const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const config = require('./config/environment');
const env = config.environment; // [development, production]

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

/**
 * @DatabaseConnection
 */
mongoose.Promise = global.Promise;
let dbURI;
if(env == 'development') {
    dbURI = config.development.url;
} else if(env == 'production') {
    dbURI = config.production.url
}

mongoose.connect(dbURI, { useNewUrlParser: true })
// Mongoose Connection Events
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
/** @EndOfDatabaseConnection */


/**
 * @AppRoutes
 */
const AuthRoutes = require('./api/routes/auth.routes')
const RestaurantRoutes = require('./api/routes/restaurant.routes')
const MenuRoutes = require('./api/routes/menu.routes')
const locationRoutes = require('./api/routes/location.routes')
const userRoutes = require('./api/routes/user.routes')
const serviceRoutes = require('./api/routes/services.routes')

app.use('/api/auth', AuthRoutes)
app.use('/api/restaurants', RestaurantRoutes)
app.use('/api/menu', MenuRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/service', serviceRoutes)

app.get('/', (req, res) => {
    res.send("greetings from restaurant finder API!")
});

app.get('/test', (req, res) => {
    res.send("test works fine")
});
/** @EndOfAppRoutes */


/**
 * @ServerCreation
 */
app.listen(PORT, (err, result) => {
    if (err) { console.log('error running server') }
    else { console.log(`server running on port ${PORT}`) }
})
/** @EndOfServerCreation */


