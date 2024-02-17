const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8')

const server = http.createServer((req, res) => {
    const {url} = req;

    if (url === '/' || url === '/home') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        
        res.end('<h1>Node Farm</h1>')
    } else if (url === '/api') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(data);
    }
    else {
        res.writeHead(404, {
            responseStatus: {code: 404, message:"Not found"}
        })
        res.end('Not found')
    }
});


server.listen(8000, '127.0.0.1', () => {
    console.log('server listening on port 8000');
})