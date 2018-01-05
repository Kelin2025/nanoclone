const { JSDOM } = require('jsdom')

const nanoclone = require('../index')

it('Null/undefined/functions/etc', () => {
  // Null
  expect(nanoclone(null)).toBeNull()

  // Undefined
  expect(nanoclone()).toBeUndefined()

  // Function
  const func = () => {}
  expect(nanoclone(func)).toBe(func)

  // Etc: numbers and string
  expect(nanoclone(5)).toBe(5)
  expect(nanoclone('string')).toBe('string')
  expect(nanoclone(false)).toBe(false)
  expect(nanoclone(true)).toBe(true)
})

it('DOM Node', () => {
  const src = new JSDOM(`<p>Hello world</p>`).window.document

  const copy = nanoclone(src)

  expect(src.body.isEqualNode(copy.body)).toBe(true)
})

it('Date', () => {
  const date = '2012-01-26T13:51:50.417Z'

  expect(nanoclone(new Date(date))).toEqual(new Date(date))
})

it('RegExp', () => {
  const regexp = /^$/

  expect(nanoclone(regexp)).toEqual(regexp)
})

it('Arrays', () => {
  const tests = [
    [5, 5, 8, 'string'], // Flat
    [5, 5, 8, { a: 'string' }, [7, 9]] // Attached
  ]

  tests.forEach((src) => {
    const copy = nanoclone(src)

    expect(src).toEqual(copy)
  })
})

it('Object', () => {
  const src = {
    a: 5, b: 6
  }

  const copy = nanoclone(src)

  expect(src).toEqual(copy)
})

it('Map', () => {
  const src = new Map([['foo', 'bar']])

  const copy = nanoclone(src)

  expect(src).toEqual(copy)
})

it('Set', () => {
  const src = new Set(['foo', 'bar'])

  const copy = nanoclone(src)

  expect(src).toEqual(copy)
})
