import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  animateCartTrigger?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, animateCartTrigger }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const cartControls = useAnimation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Payment Plans', href: '/payment-plans' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Animate cart icon when trigger changes
  useEffect(() => {
    if (animateCartTrigger && animateCartTrigger > 0) {
      cartControls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.4, ease: "easeInOut" }
      });
    }
  }, [animateCartTrigger, cartControls]);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSearchOpen]);

  const handleProductClick = (id: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-brand-green">
                TOMORROW<span className="text-gray-400 font-light">DEALS</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-xs font-medium transition-colors ${
                    isActive(link.href) ? 'text-brand-green' : 'text-gray-500 hover:text-brand-green'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-gray-500 hover:text-brand-green transition-colors"
              >
                <Search size={18} />
              </button>
              
              <motion.button 
                animate={cartControls}
                onClick={onOpenCart}
                className="relative p-1.5 text-gray-500 hover:text-brand-green transition-colors"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-green text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              <button 
                className="md:hidden p-1.5 text-gray-500 hover:text-brand-green transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop for closing on outside click */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 top-14 sm:top-16 bg-black/5 z-40 md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 overflow-hidden z-50 md:hidden"
              >
                <div className="px-4 py-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`block px-3 py-3 text-sm font-medium rounded-lg ${
                        isActive(link.href) ? 'bg-brand-green-light text-brand-green' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-gray-100">
              <span className="text-sm font-bold text-brand-green tracking-tight">SEARCH PRODUCTS</span>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-brand-green transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-14 pr-6 text-sm sm:text-base font-medium focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all placeholder:text-gray-300"
                  />
                </div>

                {/* Results Area */}
                <div className="space-y-6">
                  {!searchQuery ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400 text-sm font-medium">Please type a keyword in the search bar to find products</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleProductClick(product.id)}
                          className="flex items-center p-3 rounded-2xl border border-gray-100 hover:border-brand-green/20 hover:bg-gray-50 transition-all cursor-pointer group"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-50">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-green transition-colors">{product.name}</h4>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{product.category}</p>
                            <p className="text-xs font-bold text-brand-green mt-1">${product.price.toFixed(2)}</p>
                          </div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-brand-green transition-colors" />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400 text-sm font-medium">No products found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


