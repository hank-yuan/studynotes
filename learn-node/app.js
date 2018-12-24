// 全局变量
console.log('console是一个全局变量')
console.log(__dirname)
console.log(__filename)

// 模块
const stuff = require('./mymodule')

console.log(stuff.counter([1, 2, 3]))
console.log(stuff.pi)

// or
const pi = require('./mymodule').pi
console.log(pi)

// 事件,先调用事件库events
const events = require('events')

class Person {
  constructor()
}
