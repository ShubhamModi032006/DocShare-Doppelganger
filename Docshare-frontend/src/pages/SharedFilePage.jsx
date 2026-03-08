import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Shield, Download, MessageSquare, Lock, Clock, Eye, Send, AlertTriangle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Badge } from '../components/ui/UIComponents';
import { formatDate, isExpired, formatFileSize } from '../data/mockData';
import toast from 'react-hot-toast';

export default function SharedFilePage() {
  const { token } = useParams();
  const { links, files, addAuditLog } = useApp();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Client Alice', text: 'Please review section 3 carefully.', time: '2026-03-06T10:00:00Z' }
  ]);
  const [hasViewed, setHasViewed] = useState(false);

  const link = links.find(l => l.token === token);
  const file = link ? files.find(f => f.id === link.fileId) : null;
  const expired = link ? (isExpired(link.expiresAt) || link.status === 'expired' || link.status === 'revoked') : true;

  if (!link) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-slate-300" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-poppins mb-3">Link Not Found</h1>
          <p className="text-slate-500">This link doesn't exist or has been removed from DocShare.</p>
        </motion.div>
      </div>
    );
  }

  if (expired) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-poppins mb-3">This secure link has expired.</h1>
          <p className="text-slate-500 mb-6">
            {link.status === 'revoked'
              ? 'This link has been revoked by the document owner.'
              : 'The access window for this document has closed. Contact the sender for a new link.'}
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            <p>Link expired on: <strong>{formatDate(link.expiresAt)}</strong></p>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleView = () => {
    if (!hasViewed) {
      addAuditLog({ user: 'Anonymous', fileId: link.fileId, fileName: link.fileName, action: 'Viewed file', ip: '0.0.0.0' });
      setHasViewed(true);
    }
    toast.success('File opened securely');
  };

  const handleDownload = () => {
    addAuditLog({ user: 'Anonymous', fileId: link.fileId, fileName: link.fileName, action: 'Downloaded file', ip: '0.0.0.0' });
    toast.success('Download started (simulated)');
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      user: 'Visitor',
      text: comment,
      time: new Date().toISOString()
    }]);
    setComment('');
    toast.success('Comment added');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#0a1120] border-b border-white/[0.06] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg glow-gold" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
              <Lock className="w-4 h-4 text-[#0F172A]" />
            </div>
            <span className="text-white font-bold font-poppins">DocShare</span>
            <span className="text-slate-400 text-sm hidden sm:block">/ Secure File Access</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse-gold"></div>
            <span className="text-green-400 text-xs font-medium">Encrypted</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* File card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center text-3xl flex-shrink-0">
                {link.fileName.endsWith('.pdf') ? '📄' : link.fileName.match(/\.docx?$/) ? '📝' : '📁'}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-[#0F172A] truncate">{link.fileName}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant={link.permission}>{link.permission}</Badge>
                  <Badge variant="active">Active</Badge>
                  {file && <span className="text-xs text-slate-400">{formatFileSize(file.size)}</span>}
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>Expires {formatDate(link.expiresAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>{link.views} views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    <span>AES-256 Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 bg-gray-50/50">
            <div className="flex flex-wrap gap-3">
              <Button icon={Eye} onClick={handleView}>View Document</Button>
              {link.permission === 'download' && (
                <Button variant="secondary" icon={Download} onClick={handleDownload}>Download</Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* File preview placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-6"
        >
          <h2 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C9A227]" /> Document Preview
          </h2>
          <div className="bg-gray-100 rounded-xl h-72 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm text-3xl">
                {link.fileName.endsWith('.pdf') ? '📄' : '📝'}
              </div>
              <p className="text-slate-500 text-sm font-medium">{link.fileName}</p>
              <p className="text-slate-400 text-xs mt-1">Click "View Document" to open the secure viewer</p>
              <button
                onClick={handleView}
                className="mt-4 btn-gold px-4 py-2 rounded-lg text-sm font-semibold text-[#0F172A] inline-flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> Open Secure Viewer
              </button>
            </div>
          </div>
        </motion.div>

        {/* Comments section — only if permission allows */}
        {link.permission === 'comment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C9A227]" /> Comments ({comments.length})
            </h2>
            <div className="space-y-4 mb-5">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-xs font-bold text-[#C9A227] flex-shrink-0">
                    {c.user.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#0F172A]">{c.user}</span>
                      <span className="text-xs text-slate-400">{formatDate(c.time)}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleComment} className="flex gap-3">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="input-field flex-1"
              />
              <Button type="submit" icon={Send} size="md">Send</Button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
