const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['student', 'teacher', 'admin', 'super_admin', 'parent'], 
        required: true 
    },
    profileDetails: {
        phone: String,
        address: String,
        avatar: String,
        gradeLevel: String, // For students
        children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // For parents
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
