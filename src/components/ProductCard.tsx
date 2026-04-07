import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleCardClick}
      className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:border-brand-red/20 transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="p-3 sm:p-4">
        <p className="text-[10px] font-medium text-brand-red uppercase tracking-wider mb-1">
          {product.category}
        </p>
        
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-brand-red transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-brand-red text-white p-1.5 rounded-md hover:bg-brand-red/90 transition-all active:scale-95"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};


