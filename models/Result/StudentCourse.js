const mongoose = require("mongoose");

const StudentCourseSchema  = mongoose.Schema({
  courseTitle: { type: String,
     required: true },

  courseScore: { type: String,
     default: "" ,}, 
  courseGrade: { type: String,
     default: "" },
  resitScore: { type: String,
     default: "" },
  resitGrade: { type: String,
     default: "" },
  
})
module.exports = mongoose.model('StudentCourse', StudentCourseSchema);