const Pet = require('../models/Pet');
const PetItem = require('../models/PetItem');

// Add a new pet to the database

exports.addPet = async (req, res) => {
    const { name, breed, image } = req.body;
    try { // Create a new Pet
        const pet = new Pet({ name, breed, image });
        await pet.save();
        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
// Retrieve all pets from the database
exports.getPets = async (req, res) => {
    try {        // Fetch all pets from the database
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
// Retrieve items for a specific pet from the database

exports.getItems = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.petId);
        const petItems = await PetItem.find({ petId: pet._id });

        const allPetItems = await PetItem.find();
        const categories = [...new Set(allPetItems.map(item => item.category))];

        res.render('petItems', { pet: pet, petItems: petItems, categories: categories });
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

// Retrieve items for a specific pet and category from the database
exports.getItemsByCategory = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.petId);
        const category = req.params.category;
        let petItems;

        if (category === "all") {
            petItems = await PetItem.find({ petId: pet._id });
        } else {
            petItems = await PetItem.find({ petId: pet._id, category: category });
        }

        
        const allPetItems = await PetItem.find();
        const categories = [...new Set(allPetItems.map(item => item.category))];

        res.render('petItemsCategory', { pet: pet, petItems: petItems, categories: categories });
    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}