import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="container-custom py-8 sm:py-12">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-sm sm:text-base text-gray-500">Have questions? We're here to help you with anything you need.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form className="space-y-3 bg-gray-50 p-5 sm:p-7 rounded-[32px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-green transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-green transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
              <input 
                type="text" 
                placeholder="How can we help?"
                className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-green transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                rows={4}
                placeholder="Your message here..."
                className="w-full bg-white border-none rounded-2xl py-2 px-4 text-[16px] placeholder:text-[13px] focus:ring-2 focus:ring-brand-green transition-all resize-none"
              />
            </div>
            <button className="w-full bg-brand-green text-white py-3 rounded-2xl font-bold text-sm hover:bg-brand-green/90 transition-all shadow-sm">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="bg-brand-green text-white p-8 sm:p-10 rounded-[32px] h-full">
            <h3 className="text-xl font-bold mb-8">Contact Info</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Call us</p>
                  <p className="text-sm font-bold">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Email us</p>
                  <p className="text-sm font-bold">support@tomorrowdeals.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Visit us</p>
                  <p className="text-sm font-bold">123 Commerce Ave, Digital City, DC 10101</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
