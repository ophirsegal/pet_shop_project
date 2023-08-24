const mongoose = require('mongoose');

// Define the structure of the Pet schema
const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});

// Create and export the Pet model using the defined schema
module.exports = mongoose.model('Pet', PetSchema);
