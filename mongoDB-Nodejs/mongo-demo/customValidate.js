const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/playground").then(() => {
  console.log("Connected")
})
const courseSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0
      },
      message: "A course should have at least one tag"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished
    },
    min: 10,
    max: 20,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
})
const Course = mongoose.model("Course", courseSchema)

const course1 = new Course({
  name: "Nodejs",
  author: "Mosh",
  tags: [],
  isPublished: true
})

const course2 = new Course({
  name: "React",
  author: "Mosh",
  tags: [],
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
