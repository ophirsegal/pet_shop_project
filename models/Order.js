// Importing the mongoose library for working with MongoDB
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    
    // An array of ordered items, each referencing a "PetItem" document
    orderedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PetItem' // Referencing the "PetItem" model
    }],
    // The date when the order was placed, defaulting to the current date and time
    orderDate: {
        type: Date,
        default: Date.now
    },
    // The username of the user who placed the order, required field
    username: {
        type: String,
        required: true
    },
    // Indicates whether the order is completed, defaults to false
    isOrdered: {
        type: Boolean,
        default: false
    },
    // The total price of the order, required field, default is 0
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Order', OrderSchema);
