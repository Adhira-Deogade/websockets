// const { Server } = require("socket.io");
// const io = new Server()
// io.on("connection", (socket) => {
//       console.log('Socket connected');
//     // fs.readFile(__dirname + '/home.html', (err, html) => {
//     //     if (err) {
//     //     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     //     res.end('404 File Not Found');
//     //     } else {
//     //     res.writeHead(200, { 'Content-Type': 'text/html' });
//     //     res.write(html);
//     //     res.end();
//     //     }
//     // })
// });

// io.listen(3000).on('connection', () => {
//     console.log('connection 2');
// });

const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require('fs')

const httpServer = createServer((req, res) => {
  fs.readFile(__dirname + '/socketclient.html', (err, html) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(html);
      res.end();
    }
  });
});
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    console.log("Inside io.on...")
    // Listen for messages from the client
    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        io.emit('message', `Server received: ${msg}`);

        // socket.emit('message', `Server received: ${msg}`);
        // socket.broadcast.emit('hi');
        io.emit('chat message', msg);
    });

    socket.on('cursor-position', (evt) => {
        console.log('cursor-position', evt);
        socket.broadcast.emit('cursor-position', {...evt, id: socket.id})
    });
    
    // On client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        io.emit('cursor-disconnect', {id: socket.id})
    });
});

httpServer.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// httpServer.listen(3000);