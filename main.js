const fs = require('fs')
const csv = require('csv-parser');
const { resolve } = require('path');

function readPlain(filename,rowtransformer) {
  const rows = [];
   return new Promise(resolve => { fs.createReadStream(`${filename}.csv`)
   .pipe(csv())
   .on('data', function saveToFile(row) {
     const newRow = rowtransformer(row)
     rows.push(newRow)
   })
   .on('end', function () {
    resolve(rows);
   })
  })
 
}
function writeToFile(data,filename) {
  
  fs.writeFile(`${filename}.json`, JSON.stringify(data), err => {
    if (err) {
      console.log('Error writing to js file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}
function readJsonFile(){
  fs.readFile('User.js', 'utf8', function(err, contents) {
    console.log(contents);
});
}

function extractData(users) {
  const rows = users.map(user =>
    `${user.id}, ${user.first_name}, ${user.last_name}, ${user.email}, ${user.gender}, ${user.ip_address}, ${user.color}, ${user.parentId}`
  );
  return JSON.stringify(rows);
}
module.exports={readPlain,readJsonFile,extractData,writeToFile}
