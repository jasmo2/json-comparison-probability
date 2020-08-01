const fs = require('fs')
let masterFile = process.argv[2]
let compareFile = process.argv[3]

let master = JSON.parse(fs.readFileSync(masterFile, 'utf8'))
let compare = JSON.parse(fs.readFileSync(compareFile, 'utf8'))

console.log('TCL: master', master)
console.log('TCL: compare', compare)