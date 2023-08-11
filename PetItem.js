const mongoose = require('mongoose');

const PetItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: { // replaced 'quantity' with 'price'
        type: Number,
        required: true
    },
    category: { // added 'category'
        type: String,
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    },
    image: { 
        type: String,
        required: false // make it required true if you want image to be mandatory
    }
});

module.exports = mongoose.model('PetItem', PetItemSchema);
