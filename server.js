const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8081;

http.createServer(function (request, response) {
    let filePath = '.' + request.url;

    if (filePath === './') {
        filePath = './home.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
    };

    const contentTypeHeader = contentType[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                response.writeHead(404);
                response.end('404 Not Found');
            } else {
                // Server error
                response.writeHead(500);
                response.end('500 Internal Server Error');
            }
        } else {
            // File found, serve the content
            response.writeHead(200, { 'Content-Type': contentTypeHeader });
            response.end(content, 'utf-8');
        }
    });

}).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});