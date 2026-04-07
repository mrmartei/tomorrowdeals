import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate();
  
  const total = items.reduce((sum, item) => {
    return sum + item.retailPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/payment-plans', { state: { items, total } });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-xl flex flex-col"
          >
            <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={18} className="text-brand-red" />
                <h2 className="text-base sm:text-lg font-bold">Your Cart</h2>
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Your cart is empty</h3>
                    <p className="text-gray-400 text-xs">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-brand-red text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-brand-red/90 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {items.map((item) => {
                    return (
                      <div key={item.id} className="flex space-x-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                            <button 
                              onClick={() => onRemove(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-400 mb-1">${item.retailPrice.toFixed(2)}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-100 rounded-md overflow-hidden">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="p-1 hover:bg-gray-100 transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-2 text-[10px] font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="p-1 hover:bg-gray-100 transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                            <span className="text-xs font-bold text-gray-900">
                              ${(item.retailPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Estimated Total</span>
                  <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-red text-white py-3 rounded-xl font-bold text-sm hover:bg-brand-red/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} /> Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

