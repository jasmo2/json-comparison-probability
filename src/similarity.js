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
 *
 * @param {object, string, array, number, null} objA
 * @param {object, string, array, number, null} objB
 * @return percentage <=1 && computed >=0
 */
function computeSimilarity(objA, objB) {
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  /** NOTE: I need to get the unique keys from both arrays
   * as discuss in this stack overflow post a good solution for
   * es6 is using "Set()"
   * https://stackoverflow.com/a/33121880/4755235
   */
  const combineKeys = keysA.concat(keysB)
  const uniqueCombineKeys = [...new Set(combineKeys)]

  let scoreObj = uniqueCombineKeys.reduce(
    (currentScore, key) => {
      if (keysA.includes(key) && keysB.includes(key)) {
        currentScore.scoreByKey += 1
        currentScore.matchObjScore += 1
      } else {
      }
    },
    { matchObjScore: 0, scoreByKey: 0 }
  )

  return 1
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
