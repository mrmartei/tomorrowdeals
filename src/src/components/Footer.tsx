import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-lg font-bold tracking-tight text-brand-green">
                TOMORROW<span className="text-gray-400 font-light">DEALS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Quality commodities for global markets. Minimalistic design, premium quality, and fair pricing.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-1.5 text-gray-400 hover:text-brand-green transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3 text-xs text-gray-500">
              <li className="flex items-center space-x-2">
                <Phone size={14} className="text-brand-green" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={14} className="text-brand-green" />
                <span>support@tomorrowdeals.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={14} className="text-brand-green mt-0.5" />
                <span>123 Commerce Ave, Digital City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 space-y-2 md:space-y-0">
          <p>© 2026 TomorrowDeals. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-green transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-green transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

