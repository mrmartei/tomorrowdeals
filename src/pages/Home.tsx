import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative bg-brand-green-light overflow-hidden">
        <div className="container-custom py-8 sm:py-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Quality Essentials for Your <span className="text-brand-green">Tomorrow.</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-lg mx-auto">
              Minimalistic design, premium quality, and flexible payments. 
              Discover our curated collection of daily essentials.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/products"
                className="bg-brand-green text-white px-8 py-3 rounded-full font-semibold text-sm flex items-center hover:bg-brand-green/90 transition-all"
              >
                Shop Collection
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-custom">
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-2xl font-bold">Featured Deals</h2>
          <Link to="/products" className="text-xs font-bold text-brand-green hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </section>

      {/* Quick Categories */}
      <section className="bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Electronics', 'Fashion', 'Home', 'Baby Care'].map((cat) => (
              <Link 
                key={cat}
                to={`/products?category=${cat}`}
                className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:border-brand-green/20 transition-all group"
              >
                <h3 className="font-bold text-sm group-hover:text-brand-green">{cat}</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Explore</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
