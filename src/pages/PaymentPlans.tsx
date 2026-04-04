import React from 'react';
import { CreditCard, ShieldCheck, Zap } from 'lucide-react';

export const PaymentPlans: React.FC = () => {
  return (
    <div className="container-custom py-12 sm:py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Flexible Payment Plans</h1>
        <p className="text-sm sm:text-base text-gray-500">Shop now, pay later. We offer transparent and easy financing options for all our products.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { 
            icon: <Zap className="text-brand-green" />, 
            title: "Instant Approval", 
            desc: "Get approved in seconds during checkout. No long forms or waiting." 
          },
          { 
            icon: <ShieldCheck className="text-brand-green" />, 
            title: "No Hidden Fees", 
            desc: "What you see is what you pay. Transparent pricing with zero surprises." 
          },
          { 
            icon: <CreditCard className="text-brand-green" />, 
            title: "Flexible Terms", 
            desc: "Choose from 3, 6, or 12-month installment plans to suit your budget." 
          }
        ].map((feature, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              {feature.icon}
            </div>
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-green text-white rounded-[40px] p-8 sm:p-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to start?</h2>
        <p className="text-sm sm:text-base text-white/80 mb-10 max-w-lg mx-auto">
          Add items to your cart and select "Tomorrow Pay" at checkout to see your personalized payment options.
        </p>
        <button className="bg-white text-brand-green px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all">
          Browse Products
        </button>
      </div>
    </div>
  );
};
