import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, Users, Trash2, Search, ShoppingBag, Plus, Eye, X 
} from 'lucide-react';
import { mockStore, User } from '../data/mockStore';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'customers' | 'admins' | 'products';

export const AdminDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('customers');
  const [data, setData] = useState({
    users: mockStore.getUsers(),
    products: mockStore.getProducts()
  });

  const refreshData = () => {
    setData({
      users: [...mockStore.getUsers()],
      products: [...mockStore.getProducts()]
    });
  };

  return (
    <div className="container-custom py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-brand-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 text-sm">Welcome back, {profile?.name}</p>
          </div>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-2xl overflow-x-auto no-scrollbar">
          {(['customers', 'admins', 'products'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'customers' && <UsersManager role="customer" data={data} onUpdate={refreshData} />}
            {activeTab === 'admins' && <UsersManager role="admin" data={data} onUpdate={refreshData} />}
            {activeTab === 'products' && <ProductsManager data={data} onUpdate={refreshData} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProductsManager: React.FC<{ data: any, onUpdate: () => void }> = ({ data, onUpdate }) => {
  const products = data.products;
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Grains',
    retailPrice: 0,
    wholesalePrice: 0,
    price: 0,
    description: '',
    image: 'https://picsum.photos/seed/new/600/400',
    shopId: 's1'
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    mockStore.addProduct({
      ...newProduct,
      price: newProduct.retailPrice // Using retail price as base price
    });
    setIsAdding(false);
    setNewProduct({
      name: '',
      category: 'Grains',
      retailPrice: 0,
      wholesalePrice: 0,
      price: 0,
      description: '',
      image: 'https://picsum.photos/seed/new/600/400',
      shopId: 's1'
    });
    onUpdate();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-brand-green" /> Products Inventory
        </h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-green/90 transition-all shadow-sm"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAdding && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsAdding(false)}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setIsAdding(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
              <h3 className="text-xl font-bold mb-6">Add New Product</h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-brand-green transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Retail Price ($)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      value={newProduct.retailPrice}
                      onChange={(e) => setNewProduct({...newProduct, retailPrice: parseFloat(e.target.value)})}
                      className="w-full bg-gray-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-brand-green transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Wholesale Price ($)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      value={newProduct.wholesalePrice}
                      onChange={(e) => setNewProduct({...newProduct, wholesalePrice: parseFloat(e.target.value)})}
                      className="w-full bg-gray-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-brand-green transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-brand-green transition-all"
                  >
                    <option>Grains</option>
                    <option>Oils</option>
                    <option>Sweeteners</option>
                    <option>Legumes</option>
                    <option>Canned</option>
                    <option>Spices</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-brand-green transition-all resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-brand-green text-white py-3 rounded-2xl font-bold text-sm hover:bg-brand-green/90 transition-all shadow-sm mt-4">
                  Create Product
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 max-w-sm w-full shadow-2xl relative"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-50 border border-gray-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-500 text-xs mb-4">{selectedProduct.category}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Retail</p>
                  <p className="text-brand-green font-bold">${selectedProduct.retailPrice.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Wholesale</p>
                  <p className="text-gray-900 font-bold">${selectedProduct.wholesalePrice.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6">{selectedProduct.description}</p>
              <button 
                onClick={() => { mockStore.deleteProduct(selectedProduct.id); onUpdate(); setSelectedProduct(null); }}
                className="w-full bg-red-50 text-red-500 py-3 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Delete Product
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <th className="pb-4 font-bold">Product</th>
              <th className="pb-4 font-bold">Category</th>
              <th className="pb-4 font-bold">Retail Price</th>
              <th className="pb-4 font-bold">Wholesale Price</th>
              <th className="pb-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p: any) => (
              <tr key={p.id} className="text-sm">
                <td className="py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="font-bold">{p.name}</span>
                  </div>
                </td>
                <td className="py-2 text-gray-500">{p.category}</td>
                <td className="py-2 font-bold text-brand-green">${p.retailPrice.toFixed(2)}</td>
                <td className="py-2 font-bold text-gray-900">${p.wholesalePrice.toFixed(2)}</td>
                <td className="py-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelectedProduct(p)} className="p-2 text-gray-400 hover:text-brand-green transition-colors">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => { mockStore.deleteProduct(p.id); onUpdate(); }} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="sm:hidden space-y-2">
        {products.map((p: any) => (
          <button 
            key={p.id}
            onClick={() => setSelectedProduct(p)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-gray-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-bold text-sm text-gray-900">{p.name}</span>
            </div>
            <Eye size={16} className="text-gray-400" />
          </button>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No products found in inventory.
        </div>
      )}
    </div>
  );
};

const UsersManager: React.FC<{ role: 'customer' | 'admin', data: any, onUpdate: () => void }> = ({ role, data, onUpdate }) => {
  const users = data.users.filter((u: User) => u.role === role);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-brand-green" /> {role.charAt(0).toUpperCase() + role.slice(1)}s
      </h2>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[32px] p-6 sm:p-8 max-w-sm w-full shadow-2xl relative"
            >
              <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
              <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold mb-1">{selectedUser.name}</h3>
              <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-6">{selectedUser.role}</p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Email Address</p>
                  <p className="text-sm font-bold text-gray-900">{selectedUser.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Member Since</p>
                  <p className="text-sm font-bold text-gray-900">
                    {selectedUser.joinedAt ? new Date(selectedUser.joinedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => { mockStore.deleteUser(selectedUser.id); onUpdate(); setSelectedUser(null); }}
                className="w-full bg-red-50 text-red-500 py-3 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Delete User
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <th className="pb-4 font-bold">Name</th>
              <th className="pb-4 font-bold">Email</th>
              <th className="pb-4 font-bold">Joined</th>
              <th className="pb-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u: User) => (
              <tr key={u.id} className="text-sm">
                <td className="py-2 font-bold">{u.name}</td>
                <td className="py-2 text-gray-500">{u.email}</td>
                <td className="py-2 text-gray-500">
                  {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setSelectedUser(u)} className="p-2 text-gray-400 hover:text-brand-green transition-colors">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => { mockStore.deleteUser(u.id); onUpdate(); }} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="sm:hidden space-y-2">
        {users.map((u: User) => (
          <button 
            key={u.id}
            onClick={() => setSelectedUser(u)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all text-left"
          >
            <span className="font-bold text-sm text-gray-900">{u.name}</span>
            <Eye size={16} className="text-gray-400" />
          </button>
        ))}
      </div>

      {users.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No {role}s found.
        </div>
      )}
    </div>
  );
};
