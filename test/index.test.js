const mocks = require('./__mocks__')
const { getSimilarity } = require('../src/json-comparison')
const { areObjectsDifferent, areObjectsEqual } = require('../src/utils/basic')
const { computeSimilarity } = require('../src/utils/compute')

describe('Utility functions', () => {
  const { differentObj, objA, objAUnorder } = mocks
  it('it validates both objects match even if unorganize', () => {
    expect(areObjectsEqual(objAUnorder, objA)).toEqual(true)
  })

  it('it validates objects are completly different', () => {
    expect(areObjectsDifferent(objA, differentObj)).toEqual(true)
  })
})

describe('Compute JSON comparison', () => {
  const { objA, objB } = mocks
  it('it gets scoreByKey on calculation', () => {
    const { scoreByKey } = computeSimilarity(objA, objB)
    expect(scoreByKey).toEqual(10)
  })

  it('it gets matchObjScore on calculation', () => {
    const { objA } = mocks

    const { matchObjScore } = computeSimilarity(objA, objB)
    expect(matchObjScore).toEqual(9)
  })
})

describe('Compare how similiar are the JSON - Integration', () => {
  const { objA, objB, objAUnorder, differentObj } = mocks

  it('Complete different Objects', () => {
    expect(getSimilarity(objA, differentObj)).toEqual(0)
  })
  it('Similar Objects', () => {
    expect(getSimilarity(objA, objAUnorder)).toEqual(1)
  })
  it('Computes similarity between objects', () => {
    expect(getSimilarity(objA, objB)).toEqual(0.9)
  })
})
