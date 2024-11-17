const addressService = require("./addressService");

async function createAddress(req, res) {
    try {
        const address = await addressService.createAddress(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllAddresses(req, res) {
    try {
        const addresses = await addressService.getAllAddresses();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAddressById(req, res) {
    try {
        const address = await addressService.getAddressById(
            Number(req.params.id)
        );
        if (!address)
            return res.status(404).json({ error: "Address not found" });
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateAddress(req, res) {
    try {
        const address = await addressService.updateAddress(
            Number(req.params.id),
            req.body
        );
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteAddress(req, res) {
    try {
        await addressService.deleteAddress(Number(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
