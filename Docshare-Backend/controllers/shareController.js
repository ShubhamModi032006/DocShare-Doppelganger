const SharedLink = require('../models/SharedLink');
const File = require('../models/File');
const crypto = require('crypto');
const { logAction } = require('../utils/auditLogger');

const formatLinkResponse = (link) => ({
  id: link._id,
  fileId: link.fileId,
  fileName: link.fileName,
  token: link.token,
  url: link.url,
  permission: link.permission,
  expiresAt: link.expiresAt,
  createdBy: link.createdBy.name || 'Anonymous', // Assuming populated
  status: link.status,
  views: link.views,
  recipientEmail: link.recipientEmail || null
});

const createLink = async (req, res) => {
  try {
    const { fileId, permission, expirationTime, expiresAt: customExpiry, password, recipientEmail } = req.body;
    
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Determine expiration date
    let expDate;
    if (customExpiry) {
      expDate = new Date(customExpiry);
    } else {
      expDate = new Date();
      if (expirationTime === '1 hour') expDate.setHours(expDate.getHours() + 1);
      else if (expirationTime === '24 hours') expDate.setDate(expDate.getDate() + 1);
      else if (expirationTime === '7 days') expDate.setDate(expDate.getDate() + 7);
      else expDate.setDate(expDate.getDate() + 30);
    }

    const token = crypto.randomBytes(32).toString('hex');
    const url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/shared/${token}`;

    const newLink = await SharedLink.create({
      fileId,
      fileName: file.fileName,
      token,
      url,
      permission: permission || 'view',
      expiresAt: expDate,
      createdBy: req.user._id,
      password,
      recipientEmail: recipientEmail ? recipientEmail.toLowerCase().trim() : null
    });

    await newLink.populate('createdBy', 'name');

    await logAction({
      user: req.user.name,
      fileId: fileId,
      fileName: file.fileName,
      action: 'Link creation',
      ip: req.ip
    });

    res.status(201).json(formatLinkResponse(newLink));
  } catch (error) {
    res.status(500).json({ message: 'Failed to create link', error: error.message });
  }
};

const accessSharedLink = async (req, res) => {
  try {
    const { token } = req.params;
    
    const link = await SharedLink.findOne({ token }).populate('createdBy', 'name').populate('fileId');

    if (!link) {
      return res.status(404).json({ message: 'Secure link not found.' });
    }

    if (link.status === 'expired' || link.status === 'revoked' || new Date() > link.expiresAt) {
      if (link.status === 'active') {
        link.status = 'expired';
        await link.save();
      }
      return res.status(403).json({ message: 'Secure link expired.' });
    }

    // Check recipient email restriction
    if (link.recipientEmail) {
      const providedEmail = req.query.email;
      if (!providedEmail) {
        return res.status(401).json({
          message: 'This link is restricted to a specific recipient. Please enter your email to verify.',
          requiresEmail: true,
          fileName: link.fileName
        });
      }
      if (providedEmail.toLowerCase().trim() !== link.recipientEmail) {
        return res.status(403).json({ message: 'Access denied. This secure link was not shared with you.' });
      }
    }

    // Increment views
    link.views += 1;
    await link.save();
    
    // Also increment file views
    if (link.fileId) {
       link.fileId.views += 1;
       await link.fileId.save();
    }

    // Provide logging based on user ip, since unauth or specific user might access
    // Assuming unauth client could access by link, we just log IP or specific if req.user is set
    await logAction({
      user: req.user ? req.user.name : `Guest (${req.ip})`,
      fileId: link.fileId._id,
      fileName: link.fileName,
      action: 'File access',
      ip: req.ip
    });

    // We can return the file details and link configurations so frontend can render
    res.status(200).json({
       link: formatLinkResponse(link),
       file: {
         id: link.fileId._id,
         name: link.fileId.fileName,
         size: link.fileId.size,
         type: link.fileId.type,
         fileUrl: link.fileId.fileUrl, 
         uploadedBy: link.createdBy.name,
         uploadedAt: link.fileId.uploadDate,
       }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error accessing secure link', error: error.message });
  }
};

const getMyLinks = async (req, res) => {
  try {
    const filter = req.user.role === 'Administrator' ? {} : { createdBy: req.user._id };
    const links = await SharedLink.find(filter).populate('createdBy', 'name');
    res.status(200).json(links.map(formatLinkResponse));
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve links', error: error.message });
  }
};

const revokeSharedLink = async (req, res) => {
  try {
    const link = await SharedLink.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });

    if (link.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Administrator') {
      return res.status(403).json({ message: 'Not authorized to revoke this link' });
    }

    link.status = 'revoked';
    await link.save();

    await logAction({
      user: req.user.name,
      fileId: link.fileId,
      fileName: link.fileName,
      action: 'Link revoked',
      ip: req.ip
    });

    res.status(200).json({ message: 'Link revoked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to revoke link', error: error.message });
  }
};

const getSharedWithMe = async (req, res) => {
  try {
    const email = req.user.email.toLowerCase();

    const links = await SharedLink.find({
      recipientEmail: email,
      status: 'active'
    }).populate({
      path: 'fileId',
      populate: { path: 'owner', select: 'name' }
    });

    // Filter out links that are past their expiry
    const validLinks = links.filter(l => new Date() < new Date(l.expiresAt));

    res.status(200).json(validLinks.map(link => ({
      id: link._id,
      token: link.token,
      url: link.url,
      fileName: link.fileName,
      permission: link.permission,
      expiresAt: link.expiresAt,
      sharedBy: link.fileId?.owner?.name || 'Unknown',
      status: link.status,
      views: link.views,
      file: link.fileId ? {
        id: link.fileId._id,
        name: link.fileId.fileName,
        size: link.fileId.size,
        type: link.fileId.type,
        fileUrl: link.fileId.fileUrl,
        uploadedAt: link.fileId.uploadDate,
        tags: link.fileId.tags || []
      } : null
    })));
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve shared files', error: error.message });
  }
};

module.exports = {
  createLink,
  accessSharedLink,
  getMyLinks,
  revokeSharedLink,
  getSharedWithMe
};
