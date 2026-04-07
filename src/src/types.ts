export interface Product {
  id: string;
  name: string;
  price: number;
  retailPrice: number;
  wholesalePrice: number;
  category: string;
  image: string;
  description: string;
  rating?: number;
  shopId: string;
}

export interface CartItem extends Product {
  quantity: number;
}
