const express = require('express');
const app = express();
const port = 80; // or any other port number you prefer
const path= require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')) // replace this with your desired response
});


app.listen(port, function() {
    console.log("conect to port 80")
})