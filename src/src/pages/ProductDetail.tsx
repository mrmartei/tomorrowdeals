import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowLeft, Shield, Truck, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="text-brand-green font-medium flex items-center space-x-2"
        >
          <ArrowLeft size={16} />
          <span>Back to products</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-12 sm:pt-10 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-gray-500 hover:text-brand-green transition-colors text-xs font-medium"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-gray-50 rounded-2xl overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <span className="inline-block px-2 py-1 bg-brand-green-light text-brand-green text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl font-bold text-brand-green">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Description</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Experience the perfect blend of style and functionality with our {product.name}. 
                Designed for the modern lifestyle, this {product.category.toLowerCase()} essential 
                brings quality and reliability to your daily routine. Crafted with premium materials 
                and attention to detail, it represents the core values of TomorrowDeals.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all active:scale-[0.98]"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
              
              <button className="w-full border border-gray-200 text-gray-900 py-4 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-2 bg-gray-50 rounded-full text-brand-green">
                  <Truck size={16} />
                </div>
                <span className="text-[10px] font-medium text-gray-500">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-2 bg-gray-50 rounded-full text-brand-green">
                  <Shield size={16} />
                </div>
                <span className="text-[10px] font-medium text-gray-500">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-2 bg-gray-50 rounded-full text-brand-green">
                  <RefreshCw size={16} />
                </div>
                <span className="text-[10px] font-medium text-gray-500">Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
