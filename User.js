const mongoose = require('mongoose');

// Define the structure of the User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create and export the User model using the defined schema
module.exports = mongoose.model('User', UserSchema);
