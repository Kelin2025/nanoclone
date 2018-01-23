# nanoclone
[![license](https://img.shields.io/github/license/kelin2025/nanoclone.svg)](https://github.com/kelin2025/nanoclone/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/nanoclone.svg)](https://npmjs.com/package/nanoclone)  
Only **220B** to deep clone JavaScript objects

## Is it small enough?
See the size of the most popular **[clone](https://www.npmjs.com/package/clone)** npm package with **250M+** downloads
![image](https://user-images.githubusercontent.com/4208480/34631395-30df289c-f281-11e7-8442-01502af2097a.png)
And nanoclone size:
![image](https://user-images.githubusercontent.com/4208480/34631452-7db39ae0-f281-11e7-89ab-f42d1211e147.png)

## Supported 
- [x] Primitives
- [x] Arrays
- [x] Plain objects
- [x] DOM Nodes
- [x] Date instances
- [x] RegExp instances
- [x] Maps
- [x] Sets
- [x] Circular structures

## Installation
```
yarn add nanoclone
npm install nanoclone
```

## Usage
```javascript
import clone from 'nanoclone'

let a = {
  num: 2,
  arr: [1, 2, 3]
  nested: {
    obj: {
      a: 0
    }
  }
}

let b = clone(a)
```

## License
MIT
