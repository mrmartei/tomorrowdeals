import React, { useState, useEffect, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { mockStore } from '../data/mockStore';
import { ShoppingBag, Search, Filter } from 'lucide-react';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
  cartItems?: CartItem[];
}

export const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  
  const allProducts = useMemo(() => mockStore.getProducts(), []);
  const categories = useMemo(() => Array.from(new Set(allProducts.map(p => p.category))), [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  return (
    <div className="container-custom py-4 sm:py-10">
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Our Commodities</h1>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 pl-11 pr-4 text-sm focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !selectedCategory ? 'bg-brand-red text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat ? 'bg-brand-red text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory + searchQuery}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <ShoppingBag size={48} className="mx-auto mb-4 text-gray-200" />
              <p className="text-gray-400 text-sm">No products found.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
