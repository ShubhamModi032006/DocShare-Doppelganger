import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Shield, FileCheck, Users, Clock, BarChart3, ChevronRight, Github, Twitter, Linkedin, ArrowRight, Zap, Globe } from 'lucide-react';

const features = [
  { icon: Shield, title: 'AES-256 Encrypted Sharing', desc: 'Every file and link is protected with military-grade encryption at rest and in transit.' },
  { icon: Clock, title: 'Link Expiration Control', desc: 'Set precise expiration windows — 1 hour, 24 hours, 7 days, or a custom date.' },
  { icon: Users, title: 'Role-Based Access Control', desc: 'Granular permissions for Administrators, Partners, and Clients with full auditability.' },
  { icon: BarChart3, title: 'Full Audit Logs', desc: 'Every view, download, and permission change is logged with timestamps and IPs.' },
  { icon: FileCheck, title: 'Multi-Factor Authentication', desc: 'Protect your account with TOTP-based MFA for an extra layer of security.' },
  { icon: Lock, title: 'Secure Legal Exchange', desc: 'Built specifically for law firms handling sensitive contracts, NDAs, and evidence.' },
];

const steps = [
  { step: '01', title: 'Upload File', desc: 'Drag and drop your legal document. AES-256 encryption is applied instantly.' },
  { step: '02', title: 'Generate Secure Link', desc: 'Set permissions (view/download/comment) and an expiration window.' },
  { step: '03', title: 'Share with Client or Partner', desc: 'Send the encrypted link via email or your preferred channel.' },
  { step: '04', title: 'Track Activity with Audit Logs', desc: 'Monitor every access event in real-time with our comprehensive audit trail.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center glow-gold" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
                <Lock className="w-4 h-4 text-[#0F172A]" />
              </div>
              <span className="text-white font-bold text-lg font-poppins">DocShare</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Features</a>
              <a href="#how-it-works" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">How It Works</a>
              <a href="#security" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Security</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
                Login
              </Link>
              <Link to="/register" className="btn-gold px-5 py-2 rounded-lg text-sm font-semibold">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-hero-gradient min-h-screen flex items-center pt-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-blue-500/3 rounded-full blur-3xl"></div>
          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.03] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.04] rounded-full"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-full px-4 py-1.5 mb-6">
                <Shield className="w-3.5 h-3.5 text-[#C9A227]" />
                <span className="text-[#C9A227] text-xs font-semibold uppercase tracking-widest">Enterprise-Grade Security</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold text-white font-poppins leading-[1.15] tracking-tight">
                DocShare –{' '}
                <span className="text-gold-gradient">Secure Legal</span>
                {' '}File Sharing Platform
              </h1>
              <p className="mt-6 text-slate-400 text-base lg:text-lg leading-relaxed max-w-lg">
                Exchange sensitive legal documents with confidence. AES-256 encryption, expiring
                links, role-based access, and complete audit trails — built for law firms
                that demand trust and confidentiality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/register" className="btn-gold px-7 py-3.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 group">
                  Start Securely <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="px-7 py-3.5 rounded-lg text-sm font-semibold text-white border border-white/15 hover:border-[#C9A227]/40 hover:text-[#C9A227] transition-all duration-200 inline-flex items-center justify-center gap-2">
                  Sign In
                </Link>
              </div>
              {/* Trust indicators */}
              <div className="flex items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/[0.08]">
                {[
                  { value: '256-bit', label: 'AES Encryption' },
                  { value: '100%', label: 'Audit Logged' },
                  { value: 'GDPR', label: 'Compliant' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 sm:gap-8">
                    {i > 0 && <div className="w-px h-8 bg-white/[0.08] -ml-6 sm:-ml-8"></div>}
                    <div className="text-center">
                      <p className="text-white font-bold text-xl font-poppins">{item.value}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="bg-[#1E293B]/90 rounded-2xl border border-white/10 p-6 animate-float hero-card">
                  {/* Mock UI element */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    <div className="flex-1 h-5 bg-white/5 rounded-md mx-3"></div>
                    <Lock className="w-4 h-4 text-[#C9A227]" />
                  </div>
                  <div className="space-y-2.5">
                    {['NDA_Agreement_2024.pdf', 'Merger_Contract.docx', 'Settlement_Agreement.pdf'].map((file, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-xl p-3 transition-colors border border-white/[0.05]"
                      >
                        <div className="w-8 h-8 bg-[#C9A227]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileCheck className="w-4 h-4 text-[#C9A227]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{file}</p>
                          <p className="text-slate-500 text-xs">Encrypted • Secure Link Active</p>
                        </div>
                        <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-3 p-3 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full pulse-gold"></div>
                      <p className="text-[#C9A227] text-xs font-semibold">Secure Link Generated</p>
                    </div>
                    <p className="text-slate-500 text-xs mt-1 font-mono truncate">https://docshare.io/s/abc123xyz…</p>
                  </motion.div>
                </div>
                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                  className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-3 py-2.5 flex items-center gap-2 animate-float-delayed"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[#0F172A] text-xs font-bold">End-to-End</p>
                    <p className="text-slate-500 text-[10px]">Encrypted</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-3 py-2.5 flex items-center gap-2 animate-float-delayed"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-[#C9A227]" />
                  </div>
                  <div>
                    <p className="text-[#0F172A] text-xs font-bold">Audit Logs</p>
                    <p className="text-slate-500 text-[10px]">Real-time</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-[#F8FAFC] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#C9A227] text-xs font-semibold uppercase tracking-widest bg-[#C9A227]/[0.06] px-4 py-1.5 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5" />
              Platform Features
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mt-3 font-poppins">Everything your law firm needs</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
              DocShare is engineered for the unique security and compliance requirements of legal professionals.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-[#C9A227]/25 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center mb-4 group-hover:bg-[#C9A227] transition-colors duration-300">
                  <f.icon className="w-5 h-5 text-[#C9A227] group-hover:text-[#0F172A] transition-colors duration-300" />
                </div>
                <h3 className="text-[#0F172A] font-semibold text-base mb-2 font-poppins">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-60 bg-[#C9A227]/[0.03] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-blue-500/[0.02] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-[#C9A227] text-xs font-semibold uppercase tracking-widest bg-[#C9A227]/[0.06] px-4 py-1.5 rounded-full mb-4">
              <Globe className="w-3.5 h-3.5" />
              Simple & Secure
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 font-poppins">How It Works</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
              From upload to audit log — secure document sharing in four simple steps.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#C9A227]/25 to-transparent"></div>
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center relative group"
              >
                <div className="w-16 h-16 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A227]/20 group-hover:border-[#C9A227]/40 transition-all duration-300">
                  <span className="text-[#C9A227] text-xl font-bold font-poppins">{s.step}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 font-poppins">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[220px] mx-auto">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-[#C9A227] text-xs font-semibold uppercase tracking-widest bg-[#C9A227]/[0.06] px-4 py-1.5 rounded-full mb-4">
                <Shield className="w-3.5 h-3.5" />
                Security First
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mt-3 font-poppins leading-tight">Built for the most sensitive legal matters</h2>
              <p className="text-slate-500 mt-4 leading-relaxed text-base">
                Every feature in DocShare was designed with a security-first mindset. We know that legal documents require the highest levels of protection.
              </p>
              <div className="mt-8 space-y-3">
                {['AES-256 encryption at rest and in transit', 'Zero-knowledge architecture', 'GDPR and SOC 2 compliant', 'Automatic link expiration', 'Full audit trail with IP logging', 'Multi-factor authentication support'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#C9A227] to-[#E4B93A] flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#0F172A]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/register" className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg mt-8 text-sm font-semibold group">
                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#C9A227]/15 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#C9A227]" />
                </div>
                <h3 className="text-white font-semibold text-base font-poppins">Security Dashboard</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Encryption Status', value: 'AES-256 Active' },
                  { label: 'MFA Status', value: 'Enabled' },
                  { label: 'Last Security Audit', value: 'March 2026' },
                  { label: 'Active Secure Links', value: '12 links' },
                  { label: 'Audit Log', value: '847 events logged' },
                ].map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-center justify-between p-3 bg-white/[0.04] hover:bg-white/[0.06] rounded-lg border border-white/[0.05] transition-colors"
                  >
                    <span className="text-slate-400 text-sm">{r.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{r.value}</span>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #C9A227 0%, #D4A826 40%, #E4B93A 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(15,23,42,0.12) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] font-poppins">Ready to secure your legal documents?</h2>
            <p className="text-[#0F172A]/60 mt-4 text-base max-w-md mx-auto">Join law firms that trust DocShare for sensitive document exchange.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link to="/register" className="bg-[#0F172A] text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#1E293B] transition-all duration-200 inline-flex items-center gap-2 shadow-lg group">
                Start Free Today <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="bg-white/25 text-[#0F172A] px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-white/40 transition-all duration-200 border border-white/30">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
                  <Lock className="w-3.5 h-3.5 text-[#0F172A]" />
                </div>
                <span className="text-white font-bold font-poppins">DocShare</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">Secure legal document sharing for modern law firms.</p>
            </div>
            {[
              { heading: 'Product', links: ['Features', 'Security', 'Pricing', 'Integrations'] },
              { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'] },
            ].map(col => (
              <div key={col.heading}>
                <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">{col.heading}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => <li key={l}><a href="#" className="text-slate-500 hover:text-[#C9A227] text-sm transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© 2026 DocShare. All rights reserved.</p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-600 hover:text-[#C9A227] transition-colors w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
