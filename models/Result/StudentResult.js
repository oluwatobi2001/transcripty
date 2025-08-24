const mongoose = require("mongoose");


const StudentCourseSchema = require("./StudentCourse.js").schema

const StudentRecordSchema = new mongoose.Schema({
  level: { type: Number, required: true }, // Academic level (e.g., 400, 500)
  session: { 
    type: String, 
    enum: ["active", "cancelled", "leave of absence"], 
    required: true 
  },
  academicSession: {
    type: String,
    required: true
  },

  studentStatus: { 
    type: String, 
    enum: ["Promoted", "Repeat", "Withdrawn", "Undetermined"],
    default: "Undetermined"
  },
  courses: [StudentCourseSchema], 
}, { timestamps: true });

module.exports = mongoose.model('StudentRecord', StudentRecordSchema);