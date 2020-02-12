const express = require("express");
const connectDB = require("./service/db");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const getConfig = require("./service/GetConfig");
const cors = require("cors");
const formData = require("express-form-data");
const cloudinary = require("cloudinary").v2;
const socketio = require("socket.io");
const http = require('http');

const {addUser, removeUser, getUserInRoom, getUser} = require('./controllers/user');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));


//connect data base
getConfig()
    .then(() => {
        connectDB(process.env.urlDataBase);
        app.use(passport.initialize());
        require("./service/passport")(passport);
        cloudinary.config({
            cloud_name: process.env.cloudinary_cloud_name,
            api_key: process.env.cloudinary_apikey,
            api_secret: process.env.cloudinary_apiSecret
        });
    })
    .catch(err => {
        console.error(err);
    });

app.use(formData.parse());
app.use(bodyParser.json());



// Use Routes
app.use("/api/customers", require("./routes/customers"));
app.use("/api/configs", require("./routes/configs"));

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
        }
    })
});

app.use(express.static("../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    if (!process.env.NODE_ENV) {
        console.log(`Server start on ${PORT}`);
    }
});
