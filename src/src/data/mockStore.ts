import { Product } from '../types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  joinedAt?: string;
}

class MockStore {
  private products: Product[] = [];
  private users: User[] = [];

  constructor() {
    this.load();
    if (this.products.length < 10) {
      this.seed();
    }
  }

  private seed() {
    this.products = [
      { id: '1', name: 'Premium White Rice', price: 45.00, retailPrice: 45.00, wholesalePrice: 38.00, category: 'Grains', image: 'https://picsum.photos/seed/rice/600/400', description: 'High-quality long-grain white rice.', rating: 4.8, shopId: 's1' },
      { id: '2', name: 'Refined Sunflower Oil', price: 12.50, retailPrice: 12.50, wholesalePrice: 10.20, category: 'Oils', image: 'https://picsum.photos/seed/oil/600/400', description: 'Pure refined sunflower oil.', rating: 4.7, shopId: 's2' },
      { id: '3', name: 'Granulated Sugar', price: 8.99, retailPrice: 8.99, wholesalePrice: 7.50, category: 'Sweeteners', image: 'https://picsum.photos/seed/sugar/600/400', description: 'Fine granulated white sugar.', rating: 4.5, shopId: 's1' },
      { id: '4', name: 'Whole Wheat Flour', price: 15.00, retailPrice: 15.00, wholesalePrice: 12.80, category: 'Grains', image: 'https://picsum.photos/seed/flour/600/400', description: 'Nutritious whole wheat flour.', rating: 4.3, shopId: 's2' },
      { id: '5', name: 'Extra Virgin Olive Oil', price: 24.99, retailPrice: 24.99, wholesalePrice: 21.00, category: 'Oils', image: 'https://picsum.photos/seed/oliveoil/600/400', description: 'Cold-pressed extra virgin olive oil.', rating: 4.6, shopId: 's1' },
      { id: '6', name: 'Yellow Maize', price: 32.00, retailPrice: 32.00, wholesalePrice: 28.50, category: 'Grains', image: 'https://picsum.photos/seed/maize/600/400', description: 'High-grade yellow maize.', rating: 4.9, shopId: 's2' },
      { id: '7', name: 'Brown Beans', price: 18.50, retailPrice: 18.50, wholesalePrice: 16.00, category: 'Legumes', image: 'https://picsum.photos/seed/beans/600/400', description: 'Protein-rich brown beans.', rating: 4.4, shopId: 's1' },
      { id: '8', name: 'Tomato Paste', price: 5.99, retailPrice: 5.99, wholesalePrice: 4.50, category: 'Canned', image: 'https://picsum.photos/seed/tomato/600/400', description: 'Concentrated tomato paste.', rating: 4.7, shopId: 's2' },
      { id: '9', name: 'Iodized Salt', price: 1.50, retailPrice: 1.50, wholesalePrice: 1.00, category: 'Spices', image: 'https://picsum.photos/seed/salt/600/400', description: 'Essential iodized table salt.', rating: 4.2, shopId: 's1' },
      { id: '10', name: 'Black Pepper', price: 4.50, retailPrice: 4.50, wholesalePrice: 3.80, category: 'Spices', image: 'https://picsum.photos/seed/pepper/600/400', description: 'Freshly ground black pepper.', rating: 4.8, shopId: 's2' }
    ];
    this.users = [
      { id: 'u1', name: 'Demo Admin', email: 'admin@demo.com', role: 'admin', joinedAt: '2026-01-15T10:00:00Z' },
      { id: 'cu1', name: 'Alice Customer', email: 'customer@demo.com', role: 'customer', joinedAt: '2026-03-05T09:15:00Z' }
    ];
    this.save();
  }

  private load() {
    const data = localStorage.getItem('tomorrow_deals_store_v2');
    if (data) {
      const parsed = JSON.parse(data);
      this.products = parsed.products || [];
      this.users = parsed.users || [];
    }
  }

  private save() {
    localStorage.setItem('tomorrow_deals_store_v2', JSON.stringify({
      products: this.products,
      users: this.users
    }));
  }

  // Products
  getProducts() { return this.products; }
  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    this.products.push(newProduct);
    this.save();
    return newProduct;
  }
  updateProduct(id: string, updates: Partial<Product>) {
    this.products = this.products.map(p => p.id === id ? { ...p, ...updates } : p);
    this.save();
  }
  deleteProduct(id: string) {
    this.products = this.products.filter(p => p.id !== id);
    this.save();
  }

  // Users
  getUsers() { return this.users; }
  addUser(user: Omit<User, 'id'>) {
    const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) };
    this.users.push(newUser);
    this.save();
    return newUser;
  }
  updateUser(id: string, updates: Partial<User>) {
    this.users = this.users.map(u => u.id === id ? { ...u, ...updates } : u);
    this.save();
  }
  deleteUser(id: string) {
    this.users = this.users.filter(u => u.id !== id);
    this.save();
  }
}

export const mockStore = new MockStore();
