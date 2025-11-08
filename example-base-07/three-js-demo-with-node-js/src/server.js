const http = require('http');
const path = require('path');
const fs = require('fs');

// Server to serve the HTML file
const server = http.createServer((req, res) => {
//   const filePath = path.join(__dirname, 'index.three.js.html');
// const filePath = path.join(__dirname, 'index.babylone.js.html');
// const filePath = path.join(__dirname, 'index.p5.js.html');
const filePath = path.join(__dirname, 'index.Zdog.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading the file.');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
