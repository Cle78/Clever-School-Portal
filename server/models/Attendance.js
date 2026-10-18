const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    date: { type: Date, required: true, default: Date.now },
    records: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
