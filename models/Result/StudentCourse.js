const mongoose = require("mongoose");

const StudentCourseSchema  = mongoose.Schema({
    courseTitle: {
      type:  String,
     
    } ,
courseCode:  {
  type: String
}, 
    courseScore: Number, 
    courseGrade :  String,
       


})
module.exports = mongoose.model('StudentCourse', StudentCourseSchema);