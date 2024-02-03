const mongoose = require("mongoose");

const StudentResultSchema = require("./StudentResult.js").schema
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    matricNo : {
        type: String,
        
        unique: true,

    },
    StudentGender:  {
        type: String,
       
    },
    YearGrad: {
        type: Number,
        
    },
    details: {
        type: [StudentResultSchema] 
    } 
    

})
module.exports = mongoose.model('Student', StudentSchema);