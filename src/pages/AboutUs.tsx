import React from 'react';

import { EditableText } from '../components/EditableText';

export const AboutUs: React.FC = () => {
  return (
    <div className="container-custom py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square bg-brand-red-light rounded-[40px] absolute inset-0 -rotate-3" />
          <img 
            src="https://picsum.photos/seed/about/800/800" 
            alt="About Us" 
            className="relative z-10 rounded-[40px] aspect-square object-cover shadow-sm"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            <EditableText id="about_title" defaultText="Redefining the Future of Retail." className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight" />
          </h1>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            <p>
              <EditableText 
                id="about_p1" 
                defaultText="TomorrowDeals started with a simple vision: to make high-quality products accessible to everyone through innovation and customer-centric financial solutions." 
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
                multiline
              />
            </p>
            <p>
              <EditableText 
                id="about_p2" 
                defaultText="We curate the best electronics, fashion, and home goods, ensuring that every item meets our strict quality standards. Our team works tirelessly to bring you exclusive deals that you won't find anywhere else." 
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
                multiline
              />
            </p>
            <p>
              <EditableText 
                id="about_p3" 
                defaultText="Beyond just a store, we are a community that values trust, transparency, and the excitement of discovering something new every day." 
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
                multiline
              />
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-brand-red">50k+</h4>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Customers</p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-brand-red">10k+</h4>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Products</p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-brand-red">24/7</h4>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
