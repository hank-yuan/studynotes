const EventEmitter = require("events")
// const emitter = new EventEmitter()

let url = "http://mylogger.io/log"
class Logger extends EventEmitter {
  log(message) {
    console.log(message)
    this.emit("messagelogged", { id: 1, url: url })
  }
}
module.exports = Logger
