const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/playground").then(() => {
  console.log("Connected")
})
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})
const Course = mongoose.model("Course", courseSchema)

async function updateCourse(id) {
  // deleteOne 删除第一个匹配到的文档
  const result = await Course.deleteOne({ _id: id })
  // findByIdAndRemove
  console.log(result)
}
updateCourse("5c88dc790fa58d11705213ed")
