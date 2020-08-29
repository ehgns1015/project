const a = ['red', 'black', 'whtie'];

console.log(a, typeof a)
console.log(a instanceof Array)
console.log(a instanceof Object)

const b = ['red', 'green', 'yellow'];

console.log(b, typeof b);
console.log(b instanceof Array);
console.log(b instanceof Object);

console.log(b.slice(0, 1));
console.log(Array.prototype.slice, Object.prototype.slice)