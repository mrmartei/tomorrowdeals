import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Calendar, LogOut, ShieldCheck, Store, Users, ShoppingBag, Save, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    currentPassword: 'password123',
    newPassword: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, we'd update the profile here
  };

  if (!profile) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-gray-500">Please login to view your account.</p>
        <button 
          onClick={() => navigate('/login')}
          className="mt-4 bg-brand-green text-white px-8 py-3 rounded-full font-bold text-sm"
        >
          Login Now
        </button>
      </div>
    );
  }

  const getRoleIcon = () => {
    switch (profile.role) {
      case 'admin': return <ShieldCheck className="text-brand-green" />;
      default: return <ShoppingBag className="text-brand-green" />;
    }
  };

  return (
    <div className="container-custom py-12 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Sidebar - Profile Card */}
          <div className="w-full md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center"
            >
              <div className="w-24 h-24 bg-brand-green/5 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                <User size={40} className="text-brand-green" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                {getRoleIcon()}
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest">{profile.role}</span>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-gray-50">
                {profile.role === 'admin' && (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-green text-white rounded-2xl font-bold text-xs hover:bg-brand-green/90 transition-all shadow-sm"
                  >
                    <ShieldCheck size={16} /> Admin Dashboard
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-red-500 font-bold text-xs hover:bg-red-50 transition-all"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Settings */}
          <div className="w-full md:w-2/3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-brand-green font-bold text-xs hover:underline"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <input 
                      type="text"
                      value={formData.name}
                      disabled={!isEditing}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Mail size={12} /> Email Address
                    </label>
                    <input 
                      type="email"
                      value={formData.email}
                      disabled={!isEditing}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Lock size={12} /> Current Password
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        disabled={!isEditing}
                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none transition-all disabled:opacity-60"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Lock size={12} /> New Password
                      </label>
                      <input 
                        type="password"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none transition-all"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} /> Joined On
                    </label>
                    <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm text-gray-500">
                      {profile.joinedAt ? new Date(profile.joinedAt).toLocaleDateString() : 'April 6, 2026'}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="submit"
                      className="bg-brand-green text-white px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-brand-green/90 transition-all"
                    >
                      <Save size={14} /> Save Changes
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold text-xs hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </motion.div>

            {/* Account Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Security</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your account is protected with industry-standard encryption. We recommend changing your password every 90 days.
                </p>
              </div>
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Privacy</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We never share your personal data with third parties. Your privacy is our top priority at TomorrowDeals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
