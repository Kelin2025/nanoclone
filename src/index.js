function clone (src, seen = new Map()) {
  // Immutable things - null, undefined, functions, symbols, etc.
  if (!src || typeof src !== 'object') return src

  // Things we've seen already (circular refs)
  if (seen.has(src)) return seen.get(src)

  // Basic pattern for cloning something below here is:
  // 1. Create copy
  // 2. Add it to `seen` immediately, so we recognize it if we see it in
  //    subordinate members
  // 3. clone subordinate members

  let copy
  if (src.nodeType && 'cloneNode' in src) {
    // DOM Node
    copy = src.cloneNode(true)
    seen.set(src, copy)
  } else if (src instanceof Date) {
    // Date
    copy = new Date(src.getTime())
    seen.set(src, copy)
  } else if (src instanceof RegExp) {
    // RegExp
    copy = new RegExp(src)
    seen.set(src, copy)
  } else if (Array.isArray(src)) {
    // Array
    copy = new Array(src.length)
    seen.set(src, copy)
    for (let i = 0; i < src.length; i++) copy[i] = clone(src[i], seen)
  } else if (src instanceof Map) {
    // Map
    copy = new Map()
    seen.set(src, copy)
    for (const [k, v] of src.entries()) copy.set(k, clone(v, seen))
  } else if (src instanceof Set) {
    // Set
    copy = new Set()
    seen.set(src, copy)
    for (const v of src) copy.add(clone(v, seen))
  } else if (src instanceof Object) {
    // Object
    copy = {}
    seen.set(src, copy)
    for (const [k, v] of Object.entries(src)) copy[k] = clone(v, seen)
  } else {
    // Unrecognized thing.  It's better to throw here than to return `src`, as
    // we don't know whether src needs to be deep-copied here.
    throw Error(`Unable to clone ${src}`)
  }

  return copy
}

export default function (src) {
  return clone(src, new Map())
}
