const mongoose = require('mongoose');

// Define the structure of the PetItem schema
const PetItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    },
    image: { 
        type: String,
        required: false
    },
    description: { 
        type: String,
        required: false
    }
});

// Create and export the PetItem model using the defined schema
module.exports = mongoose.model('PetItem', PetItemSchema);
