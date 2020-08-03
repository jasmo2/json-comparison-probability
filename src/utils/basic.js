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
      sortedObj[key] = element.map((el) => {
        if (typeof el === 'object') {
          return sortObj(el)
        }
        return el
      })
    } else if (typeof element === 'object') {
      sortedObj[key] = sortObj(element)
    } else {
      sortedObj[key] = element
    }

    return sortedObj
  }, {})

  return sortedObj
}

/**
 * @func areObjectsDifferent is the objects
 * are completly different
 */
function areObjectsDifferent(objA, objB) {
  if (
    typeof objA !== typeof objB ||
    Array.isArray(objA) !== Array.isArray(objB)
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

exports.areObjectsDifferent = areObjectsDifferent
exports.areObjectsEqual = areObjectsEqual
