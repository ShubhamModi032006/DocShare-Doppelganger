import { useAuth } from '../context/AuthContext';
import { Card, Badge } from '../components/ui/UIComponents';
import { PageHeader } from '../components/ui/UIComponents';
import { User, Mail, Shield, Calendar, Lock, Bell, Monitor } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <PageHeader title="Account Settings" subtitle="Manage your profile and security preferences" />

      {/* Profile Card */}
      <Card className="mb-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-[#0F172A] shadow-lg glow-gold" style={{ background: 'linear-gradient(135deg, #C9A227, #E4B93A)' }}>
            {user?.avatar}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">{user?.name}</h2>
            <p className="text-slate-500 text-sm">{user?.email}</p>
            <Badge variant={user?.role}>{user?.role}</Badge>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { icon: User, label: 'Full Name', value: user?.name },
            { icon: Mail, label: 'Email', value: user?.email || 'N/A' },
            { icon: Shield, label: 'Role', value: user?.role },
            { icon: Lock, label: 'MFA Status', value: user?.mfaEnabled ? 'Enabled' : 'Disabled' },
          ].map(field => (
            <div key={field.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <field.icon className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">{field.label}</span>
              </div>
              <span className="text-sm font-medium text-[#0F172A]">{field.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Security settings */}
      <Card>
        <h3 className="font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#C9A227]" /> Security & Preferences
        </h3>
        <div className="space-y-4">
          {[
            { icon: Bell, label: 'Email Notifications', desc: 'Get notified when files are accessed', enabled: true },
            { icon: Monitor, label: 'Session Logging', desc: 'Log all login sessions for audit', enabled: true },
            { icon: Shield, label: 'Two-Factor Authentication', desc: user?.mfaEnabled ? 'MFA is enabled on your account' : 'Enhance your account security with MFA', enabled: user?.mfaEnabled },
          ].map(setting => (
            <div key={setting.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <setting.icon className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">{setting.label}</p>
                  <p className="text-xs text-slate-500">{setting.desc}</p>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${setting.enabled ? 'bg-[#C9A227]' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${setting.enabled ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
