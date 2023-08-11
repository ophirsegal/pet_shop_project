const mongoose = require('mongoose'); // Import the Mongoose library
const OrderSchema = new mongoose.Schema({
    orderedItems: [{
        type: mongoose.Schema.Types.ObjectId, // Array of ObjectIds, referencing 'PetItem' collection
        ref: 'PetItem'                        // Reference to the 'PetItem' collection
    }],
    orderDate: {
        type: Date,              
        default: Date.now       
    },
    username: {
        type: String,            // Username of the order
        required: true
    },
    isOrdered: {
        type: Boolean,           // Flag indicating if the order is completed
        default: false
    },
    totalPrice: {
        type: Number,            // Total price of the order
        required: true,
        default: 0
    }
});
module.exports = mongoose.model('Order', OrderSchema);
