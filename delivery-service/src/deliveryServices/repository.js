const { PrismaClient } = require("@prisma/client");
const {del} = require("express/lib/application");
const prisma = new PrismaClient();

exports.findDeliveryById = async (id) => {
    return await prisma.delivery.findFirst({
        where: {
            OR: [
                { id: id },
                { orderId: id }
            ]
        },
        include: {
            rating: true,
            dispute: true
        }
    });
};

exports.createDelivery = async(deliveryObject) => {
    return await prisma.delivery.create({
        data: deliveryObject
    });
}

exports.updateDelivery = async(deliveryObject) => {
    return await prisma.delivery.update({
        data: deliveryObject,
        where: {id: deliveryObject.id, orderId: deliveryObject.orderId}
    });
}

exports.createReview = async(ratingObject) => {
    return await prisma.rating.create({
        data: ratingObject
    });
}

exports.createDispute = async(disputeObject) => {
    return await prisma.dispute.create({
        data: disputeObject
    });
}

exports.updateDispute = async(disputeObject) => {
    return await prisma.dispute.update({
        data: disputeObject,
        where: {id: disputeObject.id}
    });
}