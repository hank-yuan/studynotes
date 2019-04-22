// const EventEmitter = require("events")
// const emitter = new EventEmitter()

// Register a listener

const Logger = require("./logger")
let logger = new Logger()
logger.on("messagelogged", arg => {
  console.log("Listener called", arg)
})
logger.log("message")

const http = require("http")

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hello world")
    res.end()
  }
})

server.listen(3000)
console.log("listening on port 3000")
