const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file, encrypt) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, encrypt, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve('File written successfuly');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro('./dog.txt', 'utf-8');
    console.log('Race:' + data);

    const res = await superagent.get(`https://dog.ceo/api/breeds/image/random`);

    const response = writeFilePro('./dog-img.txt', res.body.message);
    console.log('File written successfuly');
    return response;
  } catch (err) {
    console.log(err);
  }
};

getDogPic();

// readFilePro('./dog.txt', 'utf-8')
//   .then((data) =>
//     superagent.get(`https://dog.ceo/api/breeds/${data}/image/random`)
//   )
//   .then((res) => writeFilePro('./dog-img.txt', res.body.message))
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
