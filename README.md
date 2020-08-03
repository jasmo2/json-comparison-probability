# JSON Object Similarity Score

Write a program using JavaScript (Node)
that will compare two json objects
and give a score between 0 and 1 as to how similar they are,
a score of 1 meaning the objects are identical.
There are sample JSON files in the data directory for testing.

## How to tun it

To run the tests follow the nexts steps

1. `npm install`
2. `npm test`

## Run the project

1. `npm install`
2. `npm run compare --objA=data/BreweriesMaster.json --objB=data/BreweriesMaster.json`
3. `npm run compare --objA=data/BreweriesMaster.json --objB=data/BreweriesSample2.json`

To run the script the flags _--objA_ and _--objB_ needs to be given as well as the path to the files.
