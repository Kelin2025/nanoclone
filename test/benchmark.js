const nanoclone = require('../index')

// Conveniently large JSON structure
const tc = require('thrustcurve-db/thrustcurve-db.json');

console.time('benchmark');
for (let i = 0; i < 100; i++) {
  const copy = nanoclone(tc)
}
console.timeEnd('benchmark');
