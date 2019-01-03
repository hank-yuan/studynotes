class Event {
  constructor () {
    this.listenerList = []
  }
  listen (listener) {
    this.listenerList.push(listener)
  }
  trigger () {
    this.listenerList.forEach(obj => {
      obj.call(this)
    })
  }
}

let myEvent = new Event()
myEvent.listen(() => {
  console.log('我订阅了这个事件')
})
myEvent.listen(() => {
  console.log('me too')
})
myEvent.trigger()
