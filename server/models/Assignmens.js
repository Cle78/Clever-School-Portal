const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    grade: Number,
    feedback: String
});

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    dueDate: { type: Date, required: true },
    submissions: [SubmissionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
