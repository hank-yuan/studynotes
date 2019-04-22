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

// 更新数据库
async function updateCourse(id) {
  // 方法一先查询，找到文档，编辑保存
  // 方法二先更新，直接修改文档
  const course = await Course.findById(id)
  if (!course) return
  course.set({ isPublished: true, author: "Mob" })

  const result = await course.save()
  console.log(result)
}
updateCourse("5c88a66902bbca20a6824d33")
