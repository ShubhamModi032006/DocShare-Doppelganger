const express = require('express');
const { getUsers, getAuditLogs, updateUserStatus } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Only Administrators can access these routes
router.use(protect, authorizeRoles('Administrator'));

router.get('/users', getUsers);
router.get('/audit-logs', getAuditLogs);
router.put('/users/:id/status', updateUserStatus);

module.exports = router;
