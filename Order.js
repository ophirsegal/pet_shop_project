// Importing the mongoose library for working with MongoDB
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    
    // An array of ordered items, each referencing a "PetItem" document
    orderedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PetItem' 
    }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    isOrdered: {
        type: Boolean,
        default: false
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});
module.exports = mongoose.model('Order', OrderSchema);
