const express = require('express');
const app = express();
const { readFileSync } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");

app.use( require('./routes/routes'));

app.use( express.static(__dirname + "/public"));

var options = {
    key: readFileSync("server.key"),
    cert: readFileSync("server.crt")
};
const httpServer = createServer(options, app);

// const io = require('socket.io')(httpServer);
const io = new Server(httpServer, {/* opciones de servidor */});
  
io.on("connection", (socket) => {
    socket.on('stream', (image) => {
        socket.broadcast.emit('stream', image);
    })
});

const PUERTO = 443;
  
httpServer.listen(PUERTO, () => {
    console.log('Servidor https correindo en el puerto ' + PUERTO);
});