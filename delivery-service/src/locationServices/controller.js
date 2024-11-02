const {HTTP_SUCCESS, HTTP_BAD_REQUEST} = require("../common/http_error");
const { DELIVERY_ASSIGNMENT_RADIUS, DELIVERY_SLA_PER_KM} = require("../common/constants")
const { locationUpdateRequest, deliveryAssignRequest} = require("../common/validation");
const {updateLocation, getLocation, getLocationLonAndLat, findNearestMembers} = require("./repository");
const {createDelivery} = require("../deliveryServices/repository");

exports.updateLocationController = async (req, res) => {

    const { error } = locationUpdateRequest(req.body);
    if (error) {
        return res.status(400).json({  status:false, message: error.details[0].message});
    }

    try {
        const key = req.user.userType + ":" + req.user.id;

        await updateLocation(req.body.lon, req.body.lat, key).catch((err) => {
            console.log(err)
        })

        return res
            .status(HTTP_SUCCESS)
            .json({ status:true, message: "Successfully updated the location" });

    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false, message: "Failed to update the location" });
    }
};

exports.getLocationController = async (req, res) => {

    if (!req.params.type || !req.params.id) {
        return res.status(400).json({  status:false, message: "invalid request"});
    }

    try {
        const key = req.params.type + ":" + req.params.id;

        console.log(key)

        await getLocation(key).then((result) => {
            return res
                .status(HTTP_SUCCESS)
                .json({ status:true, message: "Successfully retrieved the location", data: result });

        }).catch((err) => {
            return res
                .status(HTTP_BAD_REQUEST)
                .json({ status:false, message: "Failed to retrieve the location" });
        })

    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false, message: "Failed to retrieve the location" });
    }
};

exports.assignDeliveryController = async (req, res) => {

    const { error } = deliveryAssignRequest(req.body);
    if (error) {
        return res.status(400).json({  status:false, message: error.details[0].message});
    }

    try {
        const key =  "restaurant:" + req.body.restaurantId;

        /** Assignment Operation **/
        // 1. Midpoint calculation
        const restaurant = await getLocationLonAndLat("restaurant:" + req.body.restaurantId);
        const orderDeliveryLocation = await getLocationLonAndLat("order:" + req.body.orderId);

        if(!restaurant || !orderDeliveryLocation) {
            return res.status(400).json({  status:false, message: "unable to process the request"});
        }

        const lonMidPoint = (parseFloat(restaurant[0][0]) + parseFloat(orderDeliveryLocation[0][0])) / 2;
        const latMidPoint = (parseFloat(restaurant[0][1]) + parseFloat(orderDeliveryLocation[0][1])) / 2;

        // 2. Finding the nearest delivery agent
        const result = await findNearestMembers(lonMidPoint, latMidPoint, DELIVERY_ASSIGNMENT_RADIUS)

        const availableDeliveryAgents =  filterDeliveryAgents(result)
        let assignedDeliveryAgent = "";
        if(availableDeliveryAgents.length > 0) {
            assignedDeliveryAgent = availableDeliveryAgents[0]
        }

        if(assignedDeliveryAgent === "") {
            return res.status(400).json({  status:false, message: "unable to identify an agent"});
        }

        const deliveryPartnerId = assignedDeliveryAgent[0].split(':');

        // 3. Creating Delivery Request
        let deliveryObject = {
            orderId: req.body.orderId,
            userid: req.body.userId,
            deliveryPartnerId: parseInt(deliveryPartnerId[1]),
            deliverySla: DELIVERY_SLA_PER_KM * assignedDeliveryAgent[1],
            restaurant: restaurant[0] +","+ restaurant[1],
            destination: orderDeliveryLocation[0] +","+ orderDeliveryLocation[1],
        }

        await createDelivery(deliveryObject).catch((err) => {
            console.log(err)
        });

        return res
            .status(HTTP_SUCCESS)
            .json({ status:true, message: "Successfully assigned the delivery agent", data: assignedDeliveryAgent });

    } catch {
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status:false, message: "Failed to retrieve the location" });
    }
};

function filterDeliveryAgents(results) {
    return results.filter(result => result[0].startsWith('deliveryagent'));
}