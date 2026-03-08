import { useState } from 'react';
import { motion } from 'framer-motion';
import { Files, Search, Download, Trash2, Share2, Eye, Filter, ArrowUpDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { PageHeader, Badge, Button, Card, EmptyState } from '../components/ui/UIComponents';
import { formatFileSize, formatDate, FILE_ICONS } from '../data/mockData';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function FilesPage() {
  const { user } = useAuth();
  const { files, deleteFile, addAuditLog } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | pdf | docx | images
  const [sortBy, setSortBy] = useState('date'); // date | name | size
  const [tab, setTab] = useState('my'); // my | shared
  const [confirmDelete, setConfirmDelete] = useState(null);

  const myFiles = user?.role === 'Client'
    ? files.filter(f => f.sharedWith.includes(user.name))
    : user?.role === 'Administrator'
      ? files
      : files.filter(f => f.uploadedById === user?.id);

  const sharedFiles = files.filter(f => f.sharedWith.includes(user?.name));

  const displayFiles = (tab === 'my' ? myFiles : sharedFiles)
    .filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    .filter(f => filter === 'all' ? true : filter === 'images' ? ['png', 'jpg', 'jpeg'].includes(f.type) : f.type === filter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'size') return b.size - a.size;
      return new Date(b.uploadedAt) - new Date(a.uploadedAt);
    });

  const handleDelete = (file) => {
    deleteFile(file.id);
    addAuditLog({ user: user.name, fileId: file.id, fileName: file.name, action: 'File deleted', ip: '127.0.0.1' });
    toast.success('File deleted successfully');
    setConfirmDelete(null);
  };

  const handleShare = (file) => {
    navigate('/upload');
    toast('Redirecting to share — upload a file and generate a link', { icon: 'ℹ️' });
  };

  return (
    <div>
      <PageHeader
        title="File Management"
        subtitle="Manage all your uploaded and shared documents"
        action={
          (user?.role !== 'Client') && (
            <Button icon={Files} onClick={() => navigate('/upload')}>Upload New File</Button>
          )
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100/70 rounded-xl p-1 w-fit border border-gray-200/50">
        {[
          { id: 'my', label: user?.role === 'Client' ? 'Shared with Me' : 'My Files', count: myFiles.length },
          ...(user?.role !== 'Client' ? [{ id: 'shared', label: 'Shared', count: sharedFiles.length }] : []),
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === t.id ? 'bg-white text-[#0F172A] shadow-sm' : 'text-slate-500 hover:text-[#0F172A]'
            }`}
          >
            {t.label} <span className="ml-1 text-xs text-slate-400">({t.count})</span>
          </button>
        ))}
      </div>

      <Card padding={false}>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-gray-100">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 flex-1 border border-gray-200/50 focus-within:border-[#C9A227]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(201,162,39,0.08)] transition-all duration-300">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm outline-none text-[#0F172A] placeholder-slate-400 w-full"
            />
          </div>
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none text-[#0F172A] bg-white cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="images">Images</option>
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none text-[#0F172A] bg-white cursor-pointer"
            >
              <option value="date">Sort: Date</option>
              <option value="name">Sort: Name</option>
              <option value="size">Sort: Size</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {displayFiles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-400 font-medium border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-medium">File Name</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Uploaded By</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Size</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {displayFiles.map((file, i) => (
                  <motion.tr
                    key={file.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="table-row-hover"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-lg flex-shrink-0">
                          {FILE_ICONS[file.type] || FILE_ICONS.default}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#0F172A] truncate max-w-[180px]">{file.name}</p>
                          <div className="flex gap-1 mt-0.5 flex-wrap">
                            {file.tags.map(t => <span key={t} className="text-xs text-slate-400">{t}</span>)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{file.uploadedBy}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-slate-500">{formatFileSize(file.size)}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs text-slate-400">{formatDate(file.uploadedAt)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={file.status}>{file.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button title="View" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button title="Download" className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                        {user?.role !== 'Client' && (
                          <button title="Share" onClick={() => handleShare(file)} className="p-1.5 text-slate-400 hover:text-[#C9A227] hover:bg-amber-50 rounded-lg transition-all">
                            <Share2 className="w-4 h-4" />
                          </button>
                        )}
                        {(user?.role === 'Administrator' || file.uploadedById === user?.id) && (
                          <button
                            title="Delete"
                            onClick={() => setConfirmDelete(file)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={Files}
            title="No files found"
            description={search ? 'No files match your search.' : 'Upload a document to get started.'}
            action={user?.role !== 'Client' && (
              <Button onClick={() => navigate('/upload')} icon={Files}>Upload File</Button>
            )}
          />
        )}
      </Card>

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-gray-100"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] text-center mb-2">Delete File?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              "{confirmDelete.name}" and all its shared links will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setConfirmDelete(null)} className="flex-1">Cancel</Button>
              <Button variant="danger" onClick={() => handleDelete(confirmDelete)} className="flex-1">Delete</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
