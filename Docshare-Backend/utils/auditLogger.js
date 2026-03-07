const AuditLog = require('../models/AuditLog');

const logAction = async ({ user, fileId, fileName, action, ip }) => {
  try {
    await AuditLog.create({
      user,
      fileId,
      fileName,
      action,
      ip
    });
  } catch (error) {
    console.error('Audit Log Error:', error);
  }
};

module.exports = { logAction };
