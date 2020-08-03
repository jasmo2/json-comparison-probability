const { areObjectsDifferent, areObjectsEqual } = require('../utils/basic')
const { computeSimilarity } = require('../utils/compute')
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

  const { matchObjScore, scoreByKey } = computeSimilarity(objA, objB)
  const score = matchObjScore / scoreByKey

  return score
}

exports.getSimilarity = getSimilarity
