export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Electronics' | 'Fashion' | 'Home' | 'Baby Care' | 'Beauty';
  image: string;
  description: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}
