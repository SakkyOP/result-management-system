const { model, Schema } = require("mongoose");

const linkedInPostSchema = new Schema({
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
    },
    links: {
        type: [String],  // LinkedIn post links for review
        required: true
    }
});

module.exports = model("LinkedInPost", linkedInPostSchema);