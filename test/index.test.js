const { JSDOM } = require('jsdom')

const nanoclone = require('../index')

it('Returns equal data for Null/undefined/functions/etc', () => {
  // Null
  expect(nanoclone(null)).toBeNull()

  // Undefined
  expect(nanoclone()).toBeUndefined()

  // Function
  const func = () => { }
  expect(nanoclone(func)).toBe(func)

  // Etc: numbers and string
  expect(nanoclone(5)).toBe(5)
  expect(nanoclone('string')).toBe('string')
  expect(nanoclone(false)).toBe(false)
  expect(nanoclone(true)).toBe(true)
})

it('Returns equal data for DOM Node', () => {
  const src = new JSDOM(`<p>Hello world</p>`).window.document

  const copy = nanoclone(src)

  expect(src.body.isEqualNode(copy.body)).toBe(true)
})

it('Returns equal data for Date', () => {
  const date = '2012-01-26T13:51:50.417Z'

  expect(nanoclone(new Date(date))).toEqual(new Date(date))
})

it('Returns equal data for RegExp', () => {
  const regexp = /^$/

  expect(nanoclone(regexp)).toEqual(regexp)
})

it('Returns equal data for Arrays', () => {
  const tests = [
    [5, 5, 8, 'string'], // Flat
    [5, 5, 8, { a: 'string' }, [7, 9]] // Attached
  ]

  tests.forEach(src => {
    const copy = nanoclone(src)

    expect(src).toEqual(copy)
  })
})

it('Returns equal data for Object', () => {
  const src = {
    a: 5,
    b: 6
  }

  const copy = nanoclone(src)

  expect(src).toEqual(copy)
})

it('Returns equal data for Map', () => {
  const src = new Map([['foo', 'bar']])

  const copy = nanoclone(src)

  expect(src).toEqual(copy)
})

it('Returns equal data for Set', () => {
  const src = new Set(['foo', 'bar'])

  const copy = nanoclone(src)

  expect(src).toEqual(copy)
})

test("Doesn't clone function", () => {
  const src = function b () { }

  const copy = nanoclone(src)

  expect(copy).toBe(src)
})

test('Clones Date object', () => {
  var src = new Date()

  var copy = nanoclone(src)

  copy.setHours(src.getHours() + 1) // +1 hour

  expect(copy.getHours()).not.toBe(src.getHours())
})

test('Clones RegExp', () => {
  var src = new RegExp()

  var copy = nanoclone(src)

  expect(copy).not.toBe(src)
})

test('Clones Array with nested data', () => {
  var src = [1, 'hello', [null, 'lalka']]

  var copy = nanoclone(src)

  copy[2][0] = 'mutated'
  expect(src[2][0]).toBeNull()

  copy = copy.map(i => 'mutated')

  expect(src.every(i => i !== 'mutated')).toBeTruthy()
})

test('Clones nested Arrays', () => {
  var src = [];
  src.push(src, 2, src, 3);

  var copy = nanoclone(src)
  expect(copy[0]).toEqual(copy)
  expect(src[0]).toEqual(src)
  expect(copy[0]).not.toBe(src[0])
})

test('Clones nested Objects', () => {
  var src = { a: 1, b: { c: 1, d: [1, 2, 3] } }
  var srcValues = { a: 1, b: { c: 1, d: [1, 2, 3] } }

  var copy = nanoclone(src)
  copy.a = 2
  copy.b.c = 'asdf'
  copy.b.d[1] = 4
  expect(src).toEqual(srcValues)
})

it('clones circular data', () => {
  var a = { foo: 'bar' }
  a.baz = a
  var b = { foo: 'bar' }
  b.baz = b
  expect(nanoclone(a)).toEqual(b)
})

it('Clones Map', () => {
  const src = new Map([['foo', 'bar']])

  const copy = nanoclone(src)

  copy.set('foo', 'baz')

  expect(src.get('foo')).toEqual('bar')
})

it('Clones Set', () => {
  const src = new Set(['foo', 'bar'])

  const copy = nanoclone(src)

  copy.add('baz')

  expect(src.has('baz')).toBeFalsy()
})
