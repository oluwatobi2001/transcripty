const mongoose = require("mongoose");

const StudentRecordSchema = require("./StudentResult.js").schema

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     email: {

        type: String, 
        unique: true,
        required : true

    },
    matricNo: {
        type: String,
        unique: true, 
        required: true
    },
    academicSessionAdmitted: {
        type: String,
        required: true
    },
    details: {
        type: [StudentRecordSchema],
        required: true
    }
});

module.exports = mongoose.model('Student', StudentSchema);
