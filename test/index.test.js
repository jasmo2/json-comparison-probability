const mocks = require('./__mocks__')
const JSONComparison = require('../src/json-comparison')
describe('Utility functions', () => {
  it('it validates both objects match even if unorganize', () => {
    expect(
      JSONComparison.areObjectsEqual(mocks.unorderObj, mocks.orderObj)
    ).toEqual(true)
  })

  it('it validates objects are completly different', () => {
    expect(
      JSONComparison.areObjectsDifferent(mocks.orderObj, mocks.differentObj)
    ).toEqual(true)
  })
})
