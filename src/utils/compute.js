const INITIAL_SCORE_OBJ = { matchObjScore: 0, scoreByKey: 0 }

/**
 *
 * @param {object} currentScore
 * @param {number} scoreByKeyAdd
 * @param {number} matchObjScore
 * @return currentScoreObject
 */
function addScore(currentScore, scoreByKey = 1, matchObjScore = 1) {
  const newScore = { ...currentScore }
  newScore.scoreByKey += scoreByKey
  newScore.matchObjScore += matchObjScore
  return newScore
}

/**
 *
 * @param {array, object} objA
 * @param {array, object} objB
 * @returns {shallContinueToNextIteration: boolean, score: number}
 */
function objectValidation(objA, objB) {
  if (typeof objA === 'object') {
    const score = computeSimilarity(objA, objB)
    return { shallContinueToNextIteration: true, score }
  } else {
    return { shallContinueToNextIteration: false, score: null }
  }
}

/**
 *
 * @param {array, object} elementA
 * @param {array, object} elementB
 * @returns {shallContinueToNextIteration: boolean, score: number}
 */
function arrayValidation(arrayA, arrayB) {
  if (Array.isArray(arrayA) || Array.isArray(arrayB)) {
    let longestArr = null
    if (Array.isArray(arrayA) && Array.isArray(arrayB)) {
      longestArr = arrayA.length > arrayB.length ? arrayA : arrayB
    } else if (Arrat.isArray(arrayA)) {
      longestArr = arrayA
    } else {
      longestArr = arrayB
    }

    /**NOTE:
     * Validates if the elemets inside the array are
     * objects or primitives, and after recursion reduce the score.
     */
    const score = longestArr
      .map((_el, idx) => {
        return computeSimilarity(arrayA[idx], arrayB[idx])
      })
      .reduce(
        (totalScore, itemScore) => {
          totalScore = addScore(
            totalScore,
            itemScore.scoreByKey,
            itemScore.matchObjScore
          )
          return totalScore
        },
        { ...INITIAL_SCORE_OBJ }
      )

    return { shallContinueToNextIteration: true, score }
  } else {
    return { shallContinueToNextIteration: false, score: null }
  }
}

/**
 *
 * @param {object, string, array, number, null} objA
 * @param {object, string, array, number, null} objB
 * @return percentage <=1 && computed >=0
 */
function computeSimilarity(objA, objB) {
  /**NOTE: arrayValidation() have acase in which need to take care of primitives.
   * we should check the incoming objs are not objects, or are null
   */

  const typeA = typeof objA
  const typeB = typeof objB

  if (
    typeA !== 'object' ||
    typeB !== 'object' ||
    typeA === null ||
    typeB === null
  ) {
    const score = { ...INITIAL_SCORE_OBJ }
    score = typeA === typeB ? addScore(score) : addScore(score, 1, 0)
    score = objA === objB ? addScore(score) : addScore(score, 1, 0)

    return score
  }

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
      /**
       * NOTE: if both objects have the same key then scoreByKey and matchObjKey will have an extra point, due to
       * both contitions are true
       *
       * On the other hand one of the objects is missing the key, we need to track the scoreByKey has,
       * but that objects differ in this key-value.
       */
      if (keysA.includes(key) && keysB.includes(key)) {
        const elementA = objA[key]
        const elementB = objB[key]
        currentScore = addScore(currentScore)
        if (
          typeof elementA === typeof elementB &&
          Array.isArray(elementA) === Array.isArray(elementB)
        ) {
          currentScore = addScore(currentScore)
          /** First lets take in account the Arrays then objects */
          const { shallContinueToNextIteration, score } = arrayValidation(
            elementA,
            elementB
          )
          if (shallContinueToNextIteration) {
            currentScore = addScore(
              currentScore,
              score.scoreByKey,
              score.matchObjScore
            )
          } else {
            const { shallContinueToNextIteration, score } = objectValidation(
              elementA,
              elementB
            )
            if (shallContinueToNextIteration) {
              currentScore = addScore(
                currentScore,
                score.scoreByKey,
                score.matchObjScore
              )
            } else {
              currentScore =
                elementA == elementB
                  ? addScore(currentScore)
                  : addScore(currentScore, 1, 0)
            }
          }
        } else {
          currentScore = addScore(currentScore, 1, 0)
        }
      } else {
        currentScore = addScore(currentScore, 1, 0)
      }
      // console.log(currentScore)
      return currentScore
    },
    { ...INITIAL_SCORE_OBJ }
  )

  return scoreObj
}

exports.computeSimilarity = computeSimilarity
