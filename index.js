const fs = require('fs');
const http = require('http')
const url = require('url')

////////////////////////////////
// FILES

// // Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textout = `This is what we know about avocado: ${textIn} \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textout);

// // Non-blocking, asynchrous way
// fs.readFile('./txt/start.txt', 'utf-8',(err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', (err) => { console.log("Final  file has been writen") })
//         })
//     })
// })

// console.log("Will read file");

///////////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
    const pathName = req.url
    if (pathName === '/' || pathName === '/overview') { 
        res.end("Hello from the OVERVIEW!")
    } else if (pathName === '/product') {
        res.end("This is the product!")
    } else {
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end("<h1> Page not found</h1>")
    }

})

server.listen(8000, '127.0.0.1', () => {
    console.log("listening to requests on port 8000");
});

