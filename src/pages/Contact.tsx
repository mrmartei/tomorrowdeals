import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { EditableText } from '../components/EditableText';

export const Contact: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div className="container-custom py-8 sm:py-12">
      <AnimatePresence>
        {showPopup && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-500 text-sm mb-6">
                Thank you for reaching out. Our team will get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full bg-brand-red text-white py-3 rounded-2xl font-bold text-sm hover:bg-brand-red/90 transition-all shadow-sm"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          <EditableText id="contact_title" defaultText="Get in Touch" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" />
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          <EditableText id="contact_desc" defaultText="Have questions? We're here to help you with anything you need." className="text-sm sm:text-base text-gray-500" />
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 p-5 sm:p-7 rounded-[32px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-red transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-red transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
              <input 
                required
                type="text" 
                placeholder="How can we help?"
                className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-red transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                required
                rows={4}
                placeholder="Your message here..."
                className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-red transition-all resize-none"
              />
            </div>
            <button type="submit" className="w-full bg-brand-red text-white py-3 rounded-2xl font-bold text-sm hover:bg-brand-red/90 transition-all shadow-sm">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="bg-brand-red text-white p-8 sm:p-10 rounded-[32px] h-full">
            <h3 className="text-xl font-bold mb-8">Contact Info</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Call us</p>
                  <p className="text-sm font-bold">
                    <EditableText id="contact_phone" defaultText="+1 (555) 123-4567" className="text-sm font-bold" />
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Email us</p>
                  <p className="text-sm font-bold">
                    <EditableText id="contact_email" defaultText="support@tomorrowdeals.com" className="text-sm font-bold" />
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Visit us</p>
                  <p className="text-sm font-bold">
                    <EditableText id="contact_address" defaultText="123 Commerce Ave, Digital City, DC 10101" className="text-sm font-bold" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
