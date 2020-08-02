

/**
* @param {object} obj 
* @returns sorted object by "key"
*/
function sortObj(obj) {
  if (obj === null || obj === undefined) {
    return obj
  }
  
  const objKeys = Object.keys(obj)
  const sortedObj = objKeys.sort().reduce((sortedObj, key) => {
    const element = obj[key]
    if (Array.isArray(element)) {
      sortedObj[key] = element.map(el => {
        if (typeof(el) === 'object') {
          return sortObj(el)
        }
        return el
      })
    } else if (typeof(element) === 'object'){
      sortedObj[key] = sortObj(element)
    } else {
      sortedObj[key] = element
    }
    
    return sortedObj
  },{})
  
  return sortedObj
}

/**
* @func areObjectsDifferent is the objects 
* are completly different
*/
function areObjectsDifferent(objA, objB) {
  if(
    typeof objA !== typeof objB 
    || Array.isArray(objA) !== Array.isArray(objB)
    ) {
      return true
    }
  }
  
/**
* @func areObjectsEqual is the objects 
* are equal to break the cycle
*/
function areObjectsEqual(objA, objB) {
  const sortedStrA = JSON.stringify(sortObj(objA))
  const sortedStrB = JSON.stringify(sortObj(objB))
  
  // compare strings to know if they are the same.
  return sortedStrA === sortedStrB
}

/**
* @param { object, string, array} objA 
* @param { object, string, array} objB
* @returns 0 >= score and 1<=score
*/
function getSimilarity(objA, objB) {
  
  if (areObjectsDifferent(objA, objB)) {
    //The objects comparing each other are completly diferent
    return 0
  }
  
  if (areObjectsEqual(objA, objB)) {
    //The objects comparing each other are completly equal
    return 1
  }
  
  const percentage = computeSimilarity(objA, objB)
}
  
module.exports = getSimilarity