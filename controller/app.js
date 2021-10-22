const http = require('http');
const port = 8000;

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end('Hello NodeJS')
}).listen(port)

console.log(`Server running at http://localhost:${port}`);