const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOptionIndex: { type: Number, required: true }
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    questions: [QuestionSchema],
    results: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        score: Number,
        submittedAt: { type: Date, default: Date.now }
    }],
    isActive: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
