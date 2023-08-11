const mongoose = require('mongoose');// Import the Mongoose library
const ChatSchema = new mongoose.Schema({
    from: String,           // Sender's identifier 
    to: String,             // Receiver's identifier 
    message: String,        // Content of the chat message 
    date: {                 
        type: Date,         
        default: Date.now   // Default value is the current timestamp
    }
});
module.exports = mongoose.model('Chat', ChatSchema);
