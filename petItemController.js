const PetItem = require('../models/PetItem');

exports.addPetItem = async (req, res) => {
    const { name, quantity, petId } = req.body;
    try {
        const petItem = new PetItem({ name, quantity, petId });
        await petItem.save();
        res.status(201).json(petItem);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

exports.getPetItems = async (req, res) => {
    try {
        const petItems = await PetItem.find();
        res.status(200).json(petItems);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
