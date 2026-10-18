const mongoose = require('mongoose');

const ReportCardSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    term: { type: String, required: true }, // e.g., "Term 1 - 2026/2027"
    behavioralTraits: {
        punctuality: { type: Number, min: 1, max: 5 },
        neatness: { type: Number, min: 1, max: 5 },
        politeness: { type: Number, min: 1, max: 5 },
        cooperation: { type: Number, min: 1, max: 5 },
        leadership: { type: Number, min: 1, max: 5 }
    },
    psychomotorSkills: {
        handwriting: { type: Number, min: 1, max: 5 },
        sportsAndGames: { type: Number, min: 1, max: 5 },
        crafts: { type: Number, min: 1, max: 5 },
        musicalSkills: { type: Number, min: 1, max: 5 }
    },
    teacherComments: String
}, { timestamps: true });

module.exports = mongoose.model('ReportCard', ReportCardSchema);
