const mongoose = require("mongoose");

const StudentResultSchema = require("./StudentResult.js").schema

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    matricNo: {
        type: String,
        unique: true
    },
    academicSessionAdmitted: {
        type: String,
        required: true
    },
    details: {
        type: [StudentResultSchema],
        required: true
    }
});

module.exports = mongoose.model('Student', StudentSchema);
