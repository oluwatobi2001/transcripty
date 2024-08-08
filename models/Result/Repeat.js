const Mongoose = require("mongoose");


const RepeatSchema= new Mongoose.Schema({
    courseTitle: {
        type:  String,
       
      } ,
  courseCode:  {
    type: String
  }, 
      courseScore: Number, 
      courseGrade :  String,
         
});

module.exports = Mongoose.model("Repeat", RepeatSchema)