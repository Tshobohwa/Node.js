const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate')

const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data)

const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');


const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    const {pathname, query} = url.parse(reqUrl, true);

    // overview page
    if (pathname === '/' || pathname === '/home') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })

        const cardsHtml = dataObj.map(el => replaceTemplate( tempCard, el)).join('');
        
        res.end(tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml))
    } 
    else if (pathname === '/product') {
        const product = dataObj[query.id];

        res.writeHead(200, {
            'Content-Type': 'text/html',
        })

        res.end(replaceTemplate(tempProduct, product));
    }

    // api
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(data);
    }

    // not found
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