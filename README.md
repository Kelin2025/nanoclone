# nanoclone
Only **145B** to deep clone JavaScript objects

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
