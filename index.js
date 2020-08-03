const fs = require('fs')
const JSONComparison = require('./src/json-comparison')
let masterFile = process.env.npm_config_objA
let secondaryFile = process.env.npm_config_objB

let master = JSON.parse(fs.readFileSync(masterFile, 'utf8'))
let secondary = JSON.parse(fs.readFileSync(secondaryFile, 'utf8'))

const similarityPercentage = JSONComparison.getSimilarity(master, secondary)
console.log(
  'TCL: similarity:',
  similarityPercentage,
  ', percentage:',
  `${similarityPercentage * 100}%`
)

// console.log('TCL: master', master)
// console.log('TCL: secondary', secondary)
