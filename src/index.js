export default function clone (src) {
  // Null/undefined/functions/etc
  if (
    !src ||
    typeof src !== 'object' ||
    typeof src === 'function'
  ) {
    return src
  }

  // DOM Node
  if (src.nodeType && 'cloneNode' in src) {
    return src.cloneNode(true)
  }

  // Date
  if (src instanceof Date) {
    return new Date(src.getTime())
  }

  // RegExp
  if (src instanceof RegExp) {
    return new RegExp(src)
  }

  // Arrays
  if (Array.isArray(src)) {
    return src.map(clone)
  }

  // Object
  if (src instanceof Object) {
    var obj = {}
    for (var key in src) {
      obj[key] = clone(src[key])
    }
    return obj
  }

  // ???
  return src
}
