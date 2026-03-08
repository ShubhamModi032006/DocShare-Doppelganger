// Utility functions — kept for formatting throughout the app

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export const isExpired = (isoString) => !isoString || new Date(isoString) < new Date();

export const FILE_ICONS = {
  pdf: '📄', docx: '📝', doc: '📝', zip: '📦', png: '🖼️', jpg: '🖼️', jpeg: '🖼️', default: '📁'
};

export const ROLE_COLORS = {
  Administrator: 'bg-purple-100 text-purple-800',
  Partner: 'bg-blue-100 text-blue-800',
  Client: 'bg-green-100 text-green-800',
};

