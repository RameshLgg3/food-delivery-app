const Redis = require('ioredis');

const redis = new Redis({
    host: 'localhost' || process.env.REDIS_HOST, // Redis server hostname
    port: 6379 || process.env.REDIS_PORT,        // Redis server port
});

exports.updateLocation = async(lon, lat, id) => {
    console.log(lon, lat, id)
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
exports.deleteGeoPos = async(key) => {
    return redis.zrem("locations", key)
}