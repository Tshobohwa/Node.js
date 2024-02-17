const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data)

const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%PRICE%}/g, product.price)

    !product.organic ? output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic') : output = output.replace(/{%NOT_ORGANIC%}/g, '');

    return output; 
}

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