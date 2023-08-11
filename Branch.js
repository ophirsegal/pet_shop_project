const mongoose = require('mongoose'); // Import the Mongoose library
const branchSchema = new mongoose.Schema({
    name: String,  // Name of the branch 
    lat: Number,   // Latitude coordinate of the branch location
    lon: Number    // Longitude coordinate of the branch location
});
module.exports = mongoose.model('Branch', branchSchema);
