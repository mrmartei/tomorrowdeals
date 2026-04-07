import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText } from '../components/EditableText';
import { mockStore } from '../data/mockStore';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(mockStore.getProducts());
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative bg-brand-red-light overflow-hidden">
        <div className="container-custom py-6 sm:py-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <EditableText 
                id="home_hero_title" 
                defaultText="Quality Commodities for Your Business." 
                className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight"
              />
            </h1>
            <div className="text-sm sm:text-base text-gray-600 mb-8 max-w-lg mx-auto">
              <EditableText 
                id="home_hero_desc" 
                defaultText="Minimalistic design, premium quality, and flexible payments. Discover our curated collection of premium commodities." 
                className="text-sm sm:text-base text-gray-600 mb-8 max-w-lg mx-auto"
                multiline
              />
            </div>
            <div className="flex justify-center">
              <Link 
                to="/products"
                className="bg-brand-red text-white px-8 py-3 rounded-full font-semibold text-sm flex items-center hover:bg-brand-red/90 transition-all"
              >
                Explore Products
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-custom py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand-red" />
            <h2 className="text-lg sm:text-xl font-bold">Featured Commodities</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-brand-red hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
          {products.slice(0, 12).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};
