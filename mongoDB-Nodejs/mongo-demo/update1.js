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
  // 方法二先更新，直接修改文档 参数2为更新运算符
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false
      }
    }
  )
  console.log(result)
}
updateCourse("5c88dc790fa58d11705213ed")

async function updateCourse2(id) {
  // 方法一先查询，找到文档，编辑保存
  // 方法二先更新，直接修改文档 参数2为更新运算符
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Mosh",
        isPublished: false
      }
    },
    { new: true }
  )
  console.log(result)
}
updateCourse2("5c88dc790fa58d11705213ed")
