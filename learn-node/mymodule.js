let counter = (arr) => {
  return `There are ${arr.length} elements in the array`
}

let adder = (a, b) => {
  return `the sum of the 2 numbers is ${a + b}`
}

const pi = 3.14

// module.exports.counter = counter
// module.exports.adder = adder

// module.exports = {
//   counter: counter,
//   adder: adder,
//   pi: pi
// }

module.exports = {
  counter,
  adder,
  pi
}
