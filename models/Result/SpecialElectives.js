

const mongoose = require("mongoose");
const  StudentCourseSchema  = require('../Result/StudentCourse.js').schema;


const SpecialElectiveSchema = mongoose.Schema({

    


    electives: {
        type: [StudentCourseSchema],
        default: []
      },
})

module.exports = mongoose.model('SpecialElective', SpecialElectiveSchema);
