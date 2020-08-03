const mocks = require('./__mocks__')
const JSONComparison = require('../src/json-comparison')
describe('Utility functions', () => {
  const { differentObj, orderObj, unorderObj } = mocks
  it('it validates both objects match even if unorganize', () => {
    expect(JSONComparison.areObjectsEqual(unorderObj, orderObj)).toEqual(true)
  })

  it('it validates objects are completly different', () => {
    expect(JSONComparison.areObjectsDifferent(orderObj, differentObj)).toEqual(
      true
    )
  })
})

describe('Compute JSON comparison', () => {
  const { orderObj, objB } = mocks
  it('it gets scoreByKey on calculation', () => {
    const { scoreByKey } = JSONComparison.computeSimilarity(orderObj, objB)
    expect(scoreByKey).toEqual(10)
  })

  it('it gets matchObjScore on calculation', () => {
    const { orderObj } = mocks

    const { matchObjScore } = JSONComparison.computeSimilarity(orderObj, objB)
    expect(matchObjScore).toEqual(9)
  })
})
