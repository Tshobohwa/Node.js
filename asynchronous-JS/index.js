const fs = require('fs');
const superagent = require('superagent');

fs.readFile('./dog.txt', 'utf-8', (err, data) => {
  console.log(data);
  superagent.get('https://dog.ceo/api/breeds/image/random').end((err, res) => {
    if (err) return console.log(err.message);
    fs.writeFile('./dog-img.txt', res.body.message, (err, res) => {});
  });
});
