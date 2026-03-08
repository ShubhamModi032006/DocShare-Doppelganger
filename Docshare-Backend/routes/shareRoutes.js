const express = require('express');
const { createLink, accessSharedLink, getMyLinks, revokeSharedLink, getSharedWithMe } = require('../controllers/shareController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Allow guests or clients to access a link 
router.get('/token/:token', accessSharedLink);

// Protect link management routes
router.use(protect);
router.get('/my-links', getMyLinks);
router.get('/shared-with-me', getSharedWithMe);
router.post('/create-link', authorizeRoles('Administrator', 'Partner'), createLink);
router.put('/:id/revoke', authorizeRoles('Administrator', 'Partner'), revokeSharedLink);

module.exports = router;
