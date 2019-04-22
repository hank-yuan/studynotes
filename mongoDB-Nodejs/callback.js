console.log("Before")
getUser(2, user => {
  console.log(user)
  getRepositories(user, repArray => {
    console.log(repArray)
  })
})
console.log("After")

/**
 *
 * @param {number} id
 * @param {function} callback
 */
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading form database")
    callback({ id: id, username: "Mob" })
  }, 1000)
}
// comments NOTE, OPTIMIZE, TODO, HACK, XXX, FIXME, and BUG

/**
 *
 * @param {string} username
 * @param {function} callback
 */
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Reading from github", username)
    callback(["req1,", "rep2"])
  }, 1000)
}
