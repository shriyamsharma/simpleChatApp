const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});


server = app.listen(3000, () => {
    console.log("server is connected");
});

const io = require('socket.io')(server);

//listen on every connection
io.on('connection', (socket) => {
    console.log("new user connected");

    //default username
    socket.username = "Anonymous"

    //listen on new_mesasage
    socket.on("new_message", (data) => {
        //broadcast the new msg 
        io.sockets.emit('new_message', {message: data.message, username: socket.username});
    });

    //listen on change username
    socket.on('change_username', (data) => {
        socket.username  = data.username;
    })

    //listen on  typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username: socket.username});
    })

});
