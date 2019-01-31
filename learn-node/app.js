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

class Person extends events.EventEmitter {
  constructor (name, ...args) {
    super(...args)
    this.name = name
  }
}
let xiaoming = new Person('xiaoming')
let lili = new Person('lili')
let lucy = new Person('lucy')

let person = [xiaoming, lili, lucy]
person.forEach((p) => {
  p.on('speak', (message) => {
    console.log(`${p.name} said: ${message}`)
  })
})

xiaoming.emit('speak', 'hi')

// 文件操作，需要fs库
const fs = require('fs')
// 同步读取
const readMe = fs.readFileSync('./readme.txt', 'utf8')
console.log(readMe)
// 同步写入
fs.writeFileSync('writeme.txt', readMe)
// 异步读取
fs.readFile('./readme.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// 创建删除文件目录
fs.unlink('writeme.txt', (err) => {
  if (err) throw err
  console.log('delete writeme.txt file')
})
fs.mkdir('stuff')
fs.rmdir('stuff')
// TODO 更改回调写法
fs.mkdir('stuff', () => {
  fs.readFile('readme.txt', 'utf8', (err, data) => {
    if (err) throw err
    fs.writeFile('./stuff/writeme.txt', data, () => {
      console.log('copy successfully')
    })
  })
})

// 流模块
const stream = require('stream')
// 流模式读取
const myReadStream = fs.createReadStream(__dirname + '/readme.txt')
myReadStream.setEncoding('utf8')
let data = ''
myReadStream.on('data', (chunk) => {
  data += chunk
})
myReadStream.on('end', () => {
  console.log(data)
})
// 流模式写入
const myWriteStream = fs.createWriteStream(__dirname + '/writeme.txt')
myReadStream.on('data', (chunk) => {
  myWriteStream.write(chunk)
})
// 利用管道方法写入
myReadStream.pipe(myWriteStream)
