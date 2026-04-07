import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  const handleDemoLogin = (role: 'admin' | 'customer') => {
    setLoading(true);
    setTimeout(() => {
      loginAsDemo(role);
      navigate(role === 'admin' ? '/dashboard' : '/');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[24px] p-6 shadow-xl border border-gray-100"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-6 h-6 text-brand-green" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">TomorrowDeals</h1>
          <p className="text-gray-500 mt-2 text-xs">Select a demo role to continue</p>
        </div>

        <div className="space-y-3">
          <DemoRoleButton 
            icon={<ShieldCheck />} 
            role="admin" 
            label="Admin View" 
            description="Access global platform management"
            onClick={() => handleDemoLogin('admin')}
            loading={loading}
          />
          <DemoRoleButton 
            icon={<ShoppingBag />} 
            role="customer" 
            label="Customer View" 
            description="Browse and buy commodities"
            onClick={() => handleDemoLogin('customer')}
            loading={loading}
          />
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          This is a demo environment. No real credentials required.
        </p>
      </motion.div>
    </div>
  );
};

const DemoRoleButton: React.FC<{ 
  icon: React.ReactNode, 
  role: string, 
  label: string, 
  description: string,
  onClick: () => void,
  loading: boolean
}> = ({ icon, label, description, onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full flex items-center gap-4 p-3 bg-gray-50 rounded-xl border-2 border-transparent hover:border-brand-green/20 hover:bg-white transition-all group disabled:opacity-50"
  >
    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-brand-green/10 transition-colors">
      {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" })}
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-bold text-gray-900 text-sm">{label}</h3>
      <p className="text-[11px] text-gray-500">{description}</p>
    </div>
    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green transition-colors" />
  </button>
);
