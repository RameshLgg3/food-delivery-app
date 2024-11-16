const addressRepository = require("./repository");

async function createAddress(data) {
    return addressRepository.createAddress(data);
}

async function getAllAddresses() {
    return addressRepository.getAllAddresses();
}

async function getAddressById(id) {
    return addressRepository.getAddressById(id);
}

async function updateAddress(id, data) {
    return addressRepository.updateAddress(id, data);
}

async function deleteAddress(id) {
    return addressRepository.deleteAddress(id);
}

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
