console.log('Current directory: ', process.cwd())

console.log('Value of __dirname: ', __dirname)

const fs = require('node:fs')

// asynchronously reading the text data

fs.readFile('data.txt', (err, data) => {
  console.log(data.toString())
})
