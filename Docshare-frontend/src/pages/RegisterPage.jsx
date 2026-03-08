import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { InputField, Button } from '../components/ui/UIComponents';

const roles = [
  { id: 'Administrator', label: 'Administrator', desc: 'Full platform access and user management', icon: '🛡️' },
  { id: 'Partner', label: 'Partner (Lawyer)', desc: 'Upload, share, and manage legal files', icon: '⚖️' },
  { id: 'Client', label: 'Client', desc: 'Access files shared with you', icon: '👤' },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'Partner' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong'];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsSubmitting(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      toast.success('Account created! Please sign in with your credentials.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-hero-gradient relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-[#C9A227]/[0.06] rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg glow-gold" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
              <Lock className="w-6 h-6 text-[#0F172A]" />
            </div>
            <span className="text-white text-2xl font-bold font-poppins">DocShare</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 font-poppins">Join DocShare Today</h2>
          <p className="text-slate-300 text-base leading-relaxed max-w-sm">
            Create your secure account and start sharing legal documents with confidence.
          </p>
          <div className="mt-10 space-y-3">
            {['No credit card required', 'Setup in under 2 minutes', 'Cancel anytime'].map(text => (
              <div key={text} className="flex items-center gap-3 justify-center">
                <CheckCircle className="w-4 h-4 text-[#C9A227]" />
                <span className="text-white text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0F172A] text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <h1 className="text-2xl font-bold text-[#0F172A] font-poppins">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1 mb-8">Start sharing legal documents securely</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField label="Full Name" id="name" type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
            <InputField label="Email Address" id="email" type="email" placeholder="jane@lawfirm.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} error={errors.email} />

            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Select Role</label>
              <div className="space-y-2">
                {roles.map((r) => (
                  <label
                    key={r.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      form.role === r.id
                        ? 'border-[#C9A227] bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input type="radio" name="role" value={r.id} checked={form.role === r.id} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="sr-only" />
                    <span className="text-xl">{r.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${form.role === r.id ? 'text-[#0F172A]' : 'text-slate-700'}`}>{r.label}</p>
                      <p className="text-xs text-slate-500">{r.desc}</p>
                    </div>
                    {form.role === r.id && <CheckCircle className="w-5 h-5 text-[#C9A227]" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="password" type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className={`input-field pr-10 ${errors.password ? 'border-red-400' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? strengthColors[strength - 1] : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">Strength: <span className="font-medium">{strengthLabels[strength - 1] || 'Very Weak'}</span></p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <InputField
              label="Confirm Password"
              id="confirmPassword" type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              error={errors.confirmPassword}
            />

            <Button type="submit" loading={isSubmitting} className="w-full py-3 text-base">
              Create Secure Account
            </Button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A227] hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
