const Mongoose = require("mongoose");


const ResitSchema= new Mongoose.Schema({
    courseTitle: {
        type:  String,
       
      } ,
  courseCode:  {
    type: String
  }, 
      courseScore: Number, 
      courseGrade :  String,
         
});

module.exports = ResitSchema;