const mongoose = require("mongoose");
const ResitSchema = require("./Resit.js");
const SpecialElectives = require("./SpecialElectives.js").schema;
const  StudentCourseSchema  = require('../Result/StudentCourse.js').schema;

const StudentResultSchema = mongoose.Schema({
  twoHundredLevel: {
    name: String,
    year: Number,
    courses: [StudentCourseSchema],
    resit : [ResitSchema],
   
  },
  threeHundredLevel: {
    name: String,
    year: Number,
    courses: [StudentCourseSchema],
    resit : [ResitSchema],
   
   
  },
  fourHundredLevel: {
    name: String,
    year: Number,
    courses: [StudentCourseSchema],
    resit : [ResitSchema],
   
    
  },
  fiveHundredLevel: {
    name: String,
    year: Number,
    courses: [StudentCourseSchema],
    resit : [ResitSchema],
   
    default: [] 
  },
  sixHundredLevel: {
    name: String,
    year: Number,
    courses: [StudentCourseSchema],
    resit : [ResitSchema],
   
    default: [] 
  },
  studentElectives : {
    type: [StudentCourseSchema]
  }
});

module.exports = mongoose.model('StudentResult', StudentResultSchema);
