# nanoclone
Only **145B** to deep clone JavaScript objects

## Is it small enough?
See comparison with the most popular **[clone](https://www.npmjs.com/package/clone)** npm package with **236M** downloads
![Compare with clone package](https://user-images.githubusercontent.com/4208480/33210451-5a5d6142-d12b-11e7-91b4-e14d07568eb0.png)

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
