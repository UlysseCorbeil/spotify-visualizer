
require('dotenv').config();

const http = require('http');

const PORT = process.env.PORT || 3001;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3001/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000';

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
});

// Start the server on port
app.listen(PORT);
console.log('Node server running on port ' + PORT);
console.log(CLIENT_ID);
console.log(PORT);
console.log(FRONTEND_URI);

