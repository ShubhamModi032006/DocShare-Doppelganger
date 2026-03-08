const express = require('express');
const { createLink, accessSharedLink } = require('../controllers/shareController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Allow guests or clients to access a link 
router.get('/:token', accessSharedLink);

// Protect link creation
router.post('/create-link', protect, authorizeRoles('Administrator', 'Partner'), createLink);

module.exports = router;
