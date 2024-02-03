const mongoose = require("mongoose");
const SpecialElectives = require("./SpecialElectives.js").schema;
const  StudentCourseSchema  = require('../Result/StudentCourse.js').schema;

const StudentResultSchema = mongoose.Schema({
  twoHundredLevel: {
    
    type: [StudentCourseSchema], // This defines an array of StudentCourseSchema objects
    default: [] // Optional: provide a default empty array if needed
  },
  threeHundredLevel: {
    type: [StudentCourseSchema],
    default: []
  },
  fourHundredLevel: {
    type: [StudentCourseSchema]
    ,
    default: []
  },
  fiveHundredLevel: {
    type: [StudentCourseSchema],
    default: []
  },
  sixHundredLevel: {
    type: [StudentCourseSchema],
    default: []
  },
  studentElectives : {
    type: [StudentCourseSchema]
  }
});

module.exports = mongoose.model('StudentResult', StudentResultSchema);
