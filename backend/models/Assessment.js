const { model, Schema } = require("mongoose");

const assessmentSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',  // Reference to the Student schema
        required: true
    },
    marks: {
        type: Number,  // Marks for review & evaluation
        required: true
    },
    remarks: {
        type: String,  // Remarks for review & evaluation
        default: ''
    }
});

module.exports = model("Assessment", assessmentSchema);