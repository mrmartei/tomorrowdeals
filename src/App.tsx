import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { PaymentPlans } from './pages/PaymentPlans';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import { Account } from './pages/Account';
import { Product, CartItem } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const DashboardRedirect: React.FC = () => {
  const { profile, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!profile) return <Navigate to="/login" />;

  switch (profile.role) {
    case 'admin': return <AdminDashboard />;
    case 'customer': return <Navigate to="/" />; // Customers don't have a dashboard
    default: return <Navigate to="/" />;
  }
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [animateCartTrigger, setAnimateCartTrigger] = useState(0);

  // Lock background scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setAnimateCartTrigger(prev => prev + 1);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans selection:bg-brand-red/10 selection:text-brand-red">
          <Navbar 
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
            onOpenCart={() => setIsCartOpen(true)} 
            animateCartTrigger={animateCartTrigger}
          />

          <main className="flex-grow pt-14 sm:pt-16">
            <Routes>
              <Route path="/" element={<Home onAddToCart={addToCart} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products onAddToCart={addToCart} cartItems={cartItems} />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
              <Route path="/dashboard" element={<DashboardRedirect />} />
              <Route path="/account" element={<Account />} />
              <Route path="/payment-plans" element={<PaymentPlans />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />

          <Cart 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

