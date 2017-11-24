const clone = src => {
  // Null/undefined/functions/etc
  if (
    !src ||
    typeof src !== 'object' ||
    Object.prototype.toString.call(src) === '[object Function]'
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
    const obj = Object.assign({}, src)
    Object.keys(obj).forEach(key => {
      obj[key] = clone(obj[key])
    })
    return obj
  }

  // ???
  return src
}

export default clone
