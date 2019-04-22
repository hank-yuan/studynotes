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

// -----------查询数据库
async function getCourse() {
  // eq (equal)    *********比较运算
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // in
  // nin (not in)
  const courses = await Course
    // .find({ name: "React" })
    // .find({ price: { $gt: 10, $lte: 20 } })
    .find({ price: { $in: [10, 30] } })
    .limit(10)
    .sort({ name: 1 })

  const courses = await Course
    // ************逻辑操作符
    // or and
    // .find()
    // .or([{ author: "Mosh" }, { isPublished: true }])
    // 正则表达式
    .find({ author: /^Mosh/ })
    .limit(10)
    .sort({ name: 1 })

  const courses = await Course
    // 计数
    .find({ author: /^Mosh/ })
    .limit(10)
    .sort({ name: 1 })
    .count() // 返回符合条件的数
  console.log(courses)
}
getCourse()
