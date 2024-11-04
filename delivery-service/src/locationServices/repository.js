const Redis = require('ioredis');

const redis = new Redis({
    host: 'localhost', // Redis server hostname
    port: 6379,        // Redis server port
});

exports.updateLocation = async(lon, lat, id) => {
    return await redis.geoadd("locations", lon, lat, id);
}

exports.getLocation = async(id) => {
    return await redis.geopos("locations", id);
}

exports.getLocationLonAndLat = async(id) => {
    return await redis.geopos("locations", id)
}
exports.findNearestMembers = async(lon, lat, radius) => {
    return await redis.geosearch(
        "locations",
        "FROMLONLAT", lon, lat,
        "BYRADIUS", radius, "km",
        "WITHDIST"
    );
}