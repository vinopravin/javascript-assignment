const config = {
    environment: 'production',
    development: {
        url: 'mongodb://localhost:27017/ml-restaurant-finder',
        environment: 'development'
    },
    production: {
        url: `mongodb+srv://temp_user:Me6jRWguY2Lbrcre@testcluster.9le26.mongodb.net/restaurant_finder?retryWrites=true&w=majority`,
        environment: 'production'
    }
};
module.exports = config;