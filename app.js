var express = require('express');
var app = express();

// Importing Socket.io library
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

//This all is for Socket.io messaging functionality

//attach socket.io
io.attach(server);

io.on('connection', function(socket) {
    console.log("user is connected!");

    // listen for a disconnect event
    socket.on('disconnect',function(){
        console.log('a user is disconnected');
    })
});