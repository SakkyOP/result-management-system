const { model, Schema } = require("mongoose");

const projectSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',  // Reference to the Student schema
        required: true
    },
    review: {
        marks: {
            type: Number,  // Marks for review & evaluation
            required: true
        },
        remarks: {
            type: String,  // Remarks for review & evaluation
            default: ''
        },
    },
    submission: {
        marks: {
            type: Number,  // Marks for submission (can be left empty if not available)
            default: null
        },
        remarks: {
            type: String,  // Remarks for submission (optional, can be left empty)
            default: ''
        },
    }
});

module.exports = model("Project", projectSchema);