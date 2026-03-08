const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    // Format response to match frontend
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      filesCount: user.filesCount,
      joinedAt: user.joinedAt,
      avatar: user.avatar
    }));

    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({}).sort({ timestamp: -1 });

    const formattedLogs = logs.map(log => ({
      id: log._id,
      user: log.user,
      fileId: log.fileId,
      fileName: log.fileName,
      action: log.action,
      timestamp: log.timestamp,
      ip: log.ip
    }));

    res.json(formattedLogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUsers,
  getAuditLogs
};
