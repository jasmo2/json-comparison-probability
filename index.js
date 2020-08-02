const fs = require('fs')
const getSimilarity = require('./src/similarity')
let masterFile = process.argv[2]
let secondaryFile = process.argv[3]

let master = JSON.parse(fs.readFileSync(masterFile, 'utf8'))
let secondary = JSON.parse(fs.readFileSync(secondaryFile, 'utf8'))


const similarityPercentage = getSimilarity(master, secondary)
console.log(
  'TCL: similarity:',
  similarityPercentage,
  ', percentage:',
  `${similarityPercentage * 100}%`
)

// console.log('TCL: master', master)
// console.log('TCL: secondary', secondary)