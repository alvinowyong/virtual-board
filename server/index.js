
// Import and create HTTP server
const http = require('http').createServer();

// Import socket.io dependency with HTTP server
const io = require('socket.io')(http, {
    // Allow CORS access
    cors: { origin: "*" }
});

// Listen for connection event from front-end
io.on('connection', (socket) => {
    console.log('Coonection established');

    socket.on('message', (message) =>     {
        console.log(message);
	// Broadcast message to all users
        io.emit('');   
    });
});

// Point listening port to 8080
http.listen(8080, () => console.log('Application listening on http://localhost:8080') );
