class Dep {
  constructor () {
    this.list = []
  }
  listen (subs) {
    this.list.push(subs)
  }
  trigger () {
    this.list.forEach(obj => {
      obj.update()
    })
  }
}
export default Dep
