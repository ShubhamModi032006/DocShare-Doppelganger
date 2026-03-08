import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Shield, Download, MessageSquare, Lock, Clock, Eye, Send, AlertTriangle, FileText, Mail, UserCheck } from 'lucide-react';
import { Button, Badge } from '../components/ui/UIComponents';
import { formatDate, formatFileSize } from '../data/mockData';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function SharedFilePage() {
  const { token } = useParams();
  const [linkData, setLinkData] = useState(null); // { link, file }
  const [fetchStatus, setFetchStatus] = useState('loading'); // loading | ok | notfound | expired | requires_email
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailChecking, setEmailChecking] = useState(false);
  const [restrictedFileName, setRestrictedFileName] = useState('');

  const fetchLink = async (email = null) => {
    try {
      const url = email ? `/share/token/${token}?email=${encodeURIComponent(email)}` : `/share/token/${token}`;
      const { data } = await api.get(url);
      setLinkData(data);
      setFetchStatus('ok');
    } catch (err) {
      const status = err.response?.status;
      const body = err.response?.data;
      if (status === 401 && body?.requiresEmail) {
        setRestrictedFileName(body.fileName || '');
        setFetchStatus('requires_email');
      } else if (status === 403 && email) {
        // Wrong email provided
        setEmailError('Access denied. This link was not shared with you.');
        setEmailChecking(false);
      } else if (status === 403) {
        setFetchStatus('expired');
      } else if (status === 404) {
        setFetchStatus('notfound');
      } else {
        setFetchStatus('notfound');
      }
    }
  };

  useEffect(() => {
    fetchLink();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email) return;
    setEmailError('');
    setEmailChecking(true);
    await fetchLink(email);
    setEmailChecking(false);
  };

  if (fetchStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 text-sm">Loading secure document...</p>
        </div>
      </div>
    );
  }

  if (fetchStatus === 'notfound') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-slate-300" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-poppins mb-3">Link Not Found</h1>
          <p className="text-slate-500">This link doesn't exist or has been removed from DocShare.</p>
        </motion.div>
      </div>
    );
  }

  if (fetchStatus === 'expired') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] font-poppins mb-3">This secure link has expired.</h1>
          <p className="text-slate-500 mb-6">
            The access window for this document has closed or the link has been revoked. Contact the sender for a new link.
          </p>
        </motion.div>
      </div>
    );
  }

  if (fetchStatus === 'requires_email') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
                <Lock className="w-5 h-5 text-[#0F172A]" />
              </div>
              <div>
                <p className="text-white font-bold font-poppins">DocShare</p>
                <p className="text-slate-400 text-xs">Restricted Access</p>
              </div>
            </div>
            <div className="p-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-7 h-7 text-[#C9A227]" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] text-center mb-1">Verify Your Identity</h2>
              {restrictedFileName && (
                <p className="text-slate-500 text-sm text-center mb-4">
                  Access to <strong className="text-[#0F172A]">{restrictedFileName}</strong> is restricted.
                </p>
              )}
              <p className="text-slate-500 text-sm text-center mb-6">
                This link was shared with a specific email address. Enter your email to continue.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#C9A227]/50 focus-within:shadow-[0_0_0_3px_rgba(201,162,39,0.08)] transition-all">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={e => { setEmailInput(e.target.value); setEmailError(''); }}
                    className="bg-transparent text-sm outline-none text-[#0F172A] placeholder-slate-400 w-full"
                    autoFocus
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {emailError}
                  </p>
                )}
                <Button type="submit" loading={emailChecking} className="w-full" icon={Shield}>
                  Verify & Access Document
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const { link, file } = linkData;

  const handleView = () => {
    if (file?.fileUrl) {
      window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast.success('File opened securely');
    }
  };

  const handleDownload = async () => {
    if (!file?.fileUrl) { toast.error('File URL not available'); return; }
    try {
      const response = await fetch(file.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name || link.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch {
      toast.error('Download failed');
    }
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

