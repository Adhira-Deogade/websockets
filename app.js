const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
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

server.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
