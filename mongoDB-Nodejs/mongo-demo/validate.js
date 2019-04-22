const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/playground").then(() => {
  console.log("Connected")
})
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
    match: /pattern/
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"]
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 200
  }
})
const Course = mongoose.model("Course", courseSchema)

const course1 = new Course({
  name: "Nodejs",
  author: "Mosh",
  tags: ["Nodejs", "backend"],
  isPublished: true
})

const course2 = new Course({
  name: "React",
  author: "Mosh",
  tags: ["React", "frontend"],
  isPublished: true
})

async function createCourse(course) {
  try {
    const result = await course.save()
    console.log(result)
  } catch (err) {
    console.log(err.message)
  }
}

createCourse(course1)
createCourse(course2)
