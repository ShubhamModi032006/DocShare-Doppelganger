export const MOCK_FILES = [
  {
    id: 'f1', name: 'NDA_Agreement_2024.pdf', size: 2457600, type: 'pdf',
    uploadedBy: 'John Partner', uploadedById: 2, uploadedAt: '2026-03-06T10:30:00Z',
    status: 'active', sharedWith: ['Client Alice'], tags: ['NDA', 'Legal']
  },
  {
    id: 'f2', name: 'Merger_Contract_Draft.docx', size: 1843200, type: 'docx',
    uploadedBy: 'John Partner', uploadedById: 2, uploadedAt: '2026-03-05T14:22:00Z',
    status: 'active', sharedWith: [], tags: ['Contract', 'Merger']
  },
  {
    id: 'f3', name: 'Settlement_Agreement.pdf', size: 3145728, type: 'pdf',
    uploadedBy: 'Admin User', uploadedById: 1, uploadedAt: '2026-03-04T09:15:00Z',
    status: 'active', sharedWith: ['Client Alice'], tags: ['Settlement']
  },
  {
    id: 'f4', name: 'Evidence_Photos.zip', size: 15728640, type: 'zip',
    uploadedBy: 'Admin User', uploadedById: 1, uploadedAt: '2026-03-03T16:45:00Z',
    status: 'archived', sharedWith: [], tags: ['Evidence']
  },
  {
    id: 'f5', name: 'Power_of_Attorney.pdf', size: 921600, type: 'pdf',
    uploadedBy: 'John Partner', uploadedById: 2, uploadedAt: '2026-03-02T11:00:00Z',
    status: 'active', sharedWith: ['Client Alice'], tags: ['POA']
  },
];

export const MOCK_LINKS = [
  {
    id: 'l1', fileId: 'f1', fileName: 'NDA_Agreement_2024.pdf',
    token: 'abc123xyz', url: 'http://localhost:5173/shared/abc123xyz',
    permission: 'view', expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    createdBy: 'John Partner', status: 'active', views: 3
  },
  {
    id: 'l2', fileId: 'f3', fileName: 'Settlement_Agreement.pdf',
    token: 'def456uvw', url: 'http://localhost:5173/shared/def456uvw',
    permission: 'download', expiresAt: new Date(Date.now() - 86400000).toISOString(),
    createdBy: 'Admin User', status: 'expired', views: 8
  },
  {
    id: 'l3', fileId: 'f5', fileName: 'Power_of_Attorney.pdf',
    token: 'ghi789rst', url: 'http://localhost:5173/shared/ghi789rst',
    permission: 'comment', expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdBy: 'John Partner', status: 'active', views: 1
  },
];

export const MOCK_AUDIT_LOGS = [
  { id: 1, user: 'Client Alice', fileId: 'f1', fileName: 'NDA_Agreement_2024.pdf', action: 'Viewed file', timestamp: '2026-03-07T08:30:00Z', ip: '192.168.1.10' },
  { id: 2, user: 'John Partner', fileId: 'f2', fileName: 'Merger_Contract_Draft.docx', action: 'File uploaded', timestamp: '2026-03-05T14:22:00Z', ip: '192.168.1.2' },
  { id: 3, user: 'Client Alice', fileId: 'f3', fileName: 'Settlement_Agreement.pdf', action: 'Downloaded file', timestamp: '2026-03-04T11:45:00Z', ip: '192.168.1.10' },
  { id: 4, user: 'Admin User', fileId: 'l2', fileName: 'Settlement_Agreement.pdf', action: 'Link revoked', timestamp: '2026-03-04T13:00:00Z', ip: '192.168.1.1' },
  { id: 5, user: 'John Partner', fileId: 'f5', fileName: 'Power_of_Attorney.pdf', action: 'Permission changed', timestamp: '2026-03-02T11:30:00Z', ip: '192.168.1.2' },
  { id: 6, user: 'Admin User', fileId: 'f3', fileName: 'Settlement_Agreement.pdf', action: 'File uploaded', timestamp: '2026-03-04T09:15:00Z', ip: '192.168.1.1' },
  { id: 7, user: 'Client Alice', fileId: 'f1', fileName: 'NDA_Agreement_2024.pdf', action: 'Viewed file', timestamp: '2026-03-06T15:20:00Z', ip: '192.168.1.10' },
  { id: 8, user: 'John Partner', fileId: 'f1', fileName: 'NDA_Agreement_2024.pdf', action: 'Secure link created', timestamp: '2026-03-06T10:45:00Z', ip: '192.168.1.2' },
];

export const MOCK_USERS_LIST = [
  { id: 1, name: 'Admin User', email: 'admin@docshare.com', role: 'Administrator', status: 'active', filesCount: 2, joinedAt: '2025-01-01', avatar: 'AU' },
  { id: 2, name: 'John Partner', email: 'partner@docshare.com', role: 'Partner', status: 'active', filesCount: 3, joinedAt: '2025-02-15', avatar: 'JP' },
  { id: 3, name: 'Client Alice', email: 'client@docshare.com', role: 'Client', status: 'active', filesCount: 0, joinedAt: '2025-03-10', avatar: 'CA' },
  { id: 4, name: 'Bob Client', email: 'bob@example.com', role: 'Client', status: 'inactive', filesCount: 0, joinedAt: '2025-04-20', avatar: 'BC' },
  { id: 5, name: 'Sarah Partner', email: 'sarah@firm.com', role: 'Partner', status: 'active', filesCount: 1, joinedAt: '2025-05-05', avatar: 'SP' },
];

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export const isExpired = (isoString) => new Date(isoString) < new Date();

export const FILE_ICONS = {
  pdf: '📄', docx: '📝', doc: '📝', zip: '📦', png: '🖼️', jpg: '🖼️', jpeg: '🖼️', default: '📁'
};

export const ROLE_COLORS = {
  Administrator: 'bg-purple-100 text-purple-800',
  Partner: 'bg-blue-100 text-blue-800',
  Client: 'bg-green-100 text-green-800',
};
