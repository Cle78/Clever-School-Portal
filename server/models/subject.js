const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);
