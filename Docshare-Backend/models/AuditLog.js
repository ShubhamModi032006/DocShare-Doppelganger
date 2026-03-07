const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Could be name or Client string
    fileId: { type: String },
    fileName: { type: String },
    action: {
        type: String,
        enum: ['File upload', 'File access', 'File download', 'Permission change', 'Link creation', 'Link revocation'],
        required: true
    },
    timestamp: { type: Date, default: Date.now },
    ip: { type: String }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
