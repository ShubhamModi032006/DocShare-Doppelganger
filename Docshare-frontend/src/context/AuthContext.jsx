import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@docshare.com', password: 'admin123', role: 'Administrator', avatar: 'AU', mfaEnabled: true },
  { id: 2, name: 'John Partner', email: 'partner@docshare.com', password: 'partner123', role: 'Partner', avatar: 'JP', mfaEnabled: false },
  { id: 3, name: 'Client Alice', email: 'client@docshare.com', password: 'client123', role: 'Client', avatar: 'CA', mfaEnabled: false },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mfaPending, setMfaPending] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('docshare_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
    if (found.mfaEnabled) {
      setPendingUser(found);
      setMfaPending(true);
      setLoading(false);
      return { mfaRequired: true };
    }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('docshare_user', JSON.stringify(safeUser));
    setLoading(false);
    return { mfaRequired: false };
  };

  const verifyMfa = async (otp) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (otp === '123456') {
      const { password: _, ...safeUser } = pendingUser;
      setUser(safeUser);
      localStorage.setItem('docshare_user', JSON.stringify(safeUser));
      setMfaPending(false);
      setPendingUser(null);
      setLoading(false);
      return true;
    }
    setLoading(false);
    throw new Error('Invalid OTP. Use 123456 for demo.');
  };

  const register = async ({ name, email, password, role }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) {
      setLoading(false);
      throw new Error('Email already registered');
    }
    const newUser = { id: Date.now(), name, email, role, avatar: name.slice(0, 2).toUpperCase(), mfaEnabled: false };
    setUser(newUser);
    localStorage.setItem('docshare_user', JSON.stringify(newUser));
    setLoading(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('docshare_user');
    toast.success('Logged out successfully');
  };

  const cancelMfa = () => {
    setMfaPending(false);
    setPendingUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, mfaPending, login, verifyMfa, register, logout, cancelMfa }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
