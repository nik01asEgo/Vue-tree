const http = require("http");
const fs = require('fs');

const host = 'localhost';
const port = 8081;

const requestListener = function (req, res) {
    if (req.url == '/rubrics') {
        fs.readFile('./server/tree.json', function (error, content) {
            if (error) {
                res.writeHead(500);
                res.end('srv err');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.url === '/rubrics?allowEmpty=1') {
        fs.readFile('./server/fullTree.json', function (error, content) {
            if (error) {
                res.writeHead(500);
                res.end('srv err');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(content, 'utf-8');
            }
        });
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});