const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    studentId: {
        type: String,  // Special string field for student ID
        required: true,
        unique: true
    }
});

module.exports = model("Student", studentSchema);