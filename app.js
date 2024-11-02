const express = require("express");
const app = express();
const port = 3000;
const http = require("http")

const socketio = require("socket.io")

const server = http.createServer(app)
const io = socketio(server);

app.set("view engine", "ejs");

io.on("connection", function (socket) {
     socket.on("send-location", function (data) {
          io.emit("receive-location", { id: socket.id, ...data })
     });
     socket.on("disconnect", function () {
          io.emit("user-disconnected", socket.id);
     })
})


app.get("/", function (req, res) {
     res.render("index")
})

server.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})