class Event {
  constructor () {
    this.listenerList = []
  }
  listen (listener) {
    this.listenerList.push(listener)
  }
  trigger () {
    this.listenerList.forEach(obj => {
      obj.update()
    })
  }
}

let xiaoming = {
  update () {
    console.log('我订阅了这个事件')
  }
}
let xiaohong = {
  update () {
    console.log('我是小红')
  }
}
let myEvent = new Event()
myEvent.listen(xiaoming)
myEvent.listen(xiaohong)
myEvent.trigger()
