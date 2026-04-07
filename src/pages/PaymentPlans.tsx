import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck, Zap, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { motion } from 'motion/react';

export const PaymentPlans: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutData = location.state as { items: CartItem[], total: number } | null;
  
  const [purchaseType, setPurchaseType] = useState<'retail' | 'wholesale'>('retail');
  const [isSuccess, setIsSuccess] = useState(false);

  const currentTotal = checkoutData?.items.reduce((sum, item) => {
    const price = purchaseType === 'retail' ? item.retailPrice : item.wholesalePrice;
    return sum + price * item.quantity;
  }, 0) || 0;

  const handleFinalize = () => {
    setIsSuccess(true);
    // In a real app, we'd clear the cart and save the order here
  };

  if (isSuccess) {
    return (
      <div className="container-custom py-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto bg-white p-12 rounded-[40px] border border-gray-100 shadow-xl"
        >
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-brand-red" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold text-sm hover:bg-brand-red/90 transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 sm:py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Finalize Your Purchase</h1>
        <p className="text-sm sm:text-base text-gray-500">Choose your purchase type and select a payment plan to complete your order.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingBag className="text-brand-red" /> Order Summary
            </h2>
            
            {checkoutData ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  {checkoutData.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">{item.name}</p>
                          <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold">
                        ${((purchaseType === 'retail' ? item.retailPrice : item.wholesalePrice) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Purchase Type</span>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                      <button 
                        onClick={() => setPurchaseType('retail')}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${purchaseType === 'retail' ? 'bg-white text-brand-red shadow-sm' : 'text-gray-400'}`}
                      >
                        Retail
                      </button>
                      <button 
                        onClick={() => setPurchaseType('wholesale')}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${purchaseType === 'wholesale' ? 'bg-white text-brand-red shadow-sm' : 'text-gray-400'}`}
                      >
                        Wholesale
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-brand-red">${currentTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm italic">Your cart is empty.</p>
                <button onClick={() => navigate('/products')} className="mt-4 text-brand-red font-bold text-sm">Browse Products</button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Plans */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Select Payment Plan</h2>
          {[
            { title: "Full Payment", desc: "Pay the total amount upfront and get a 2% discount.", icon: <Zap className="text-brand-red" /> },
            { title: "3-Month Installment", desc: "Split your payment into 3 easy monthly installments.", icon: <CreditCard className="text-brand-red" /> },
            { title: "6-Month Installment", desc: "Pay over 6 months with zero interest.", icon: <ShieldCheck className="text-brand-red" /> }
          ].map((plan, i) => (
            <button 
              key={i}
              onClick={handleFinalize}
              className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-brand-red hover:shadow-md transition-all text-left flex items-center gap-6 group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-brand-red/10 transition-colors">
                {plan.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-900">{plan.title}</h3>
                <p className="text-[10px] text-gray-500">{plan.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-brand-red text-white rounded-[40px] p-8 sm:p-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Need Help?</h2>
        <p className="text-sm sm:text-base text-white/80 mb-10 max-w-lg mx-auto">
          Our customer support team is available 24/7 to help you with your purchase and payment options.
        </p>
        <button className="bg-white text-brand-red px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all">
          Contact Support
        </button>
      </div>
    </div>
  );
};
