const express = require('express');
const app = express();

const PORT = 3030;
const server = require('http').Server(app);
const {v4: uuidv4 }= require('uuid');
const io = require('socket.io')(server);
const { ExpressPeerServer} = require("peer");// simply we require the peer 
const url = require('url');
const peerServer = ExpressPeerServer(server,{// then we pass it the server
    debug: true //for development purpose
});
const path =require('path');
const { RESERVED_EVENTS } = require('socket.io/dist/socket');
  
//middlewares
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "static")));
app.use("/peerjs", peerServer);

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, "static", "index.html"));// whenever we hit the slash we will send the html from the path defined
});

app.get("/join",(req,res) =>{
    res.redirect(
        url.format({
            pathname: '/join/${uuidv4()}',
            query: req.query
        })
    )
});
app.get("/joinold/:meeting_id", (req,res) =>{
    res.redirect(
        url.format({
            pathname: req.params.meeting_id,
            query: req.query
        })
    )
});

app.get("/join/:rooms", (req, res) => {
    res.render("room", { roomid: req.params.rooms, Myname: req.query.name });
});

io.on("connection", (socket) => {
    socket.on("join-room", (roomId, id, myname) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit("user-connected", id, myname);


        socket.on("tellName", (myname) => {
            console.log(myname);
            socket.to(roomId).broadcast.emit("AddName", myname);
        });

        socket.on("disconnect", () => {
            socket.to(roomId).broadcast.emit("user-disconnected", id);
        });
    });
});
server.listen(PORT);