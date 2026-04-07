import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium White Rice',
    price: 45.00,
    retailPrice: 45.00,
    wholesalePrice: 38.00,
    category: 'Grains',
    image: 'https://picsum.photos/seed/rice/600/400',
    description: 'High-quality long-grain white rice, perfect for everyday meals.',
    rating: 4.8,
    shopId: 's1'
  },
  {
    id: '2',
    name: 'Refined Sunflower Oil',
    price: 12.50,
    retailPrice: 12.50,
    wholesalePrice: 10.20,
    category: 'Oils',
    image: 'https://picsum.photos/seed/oil/600/400',
    description: 'Pure refined sunflower oil for healthy cooking.',
    rating: 4.7,
    shopId: 's2'
  },
  {
    id: '3',
    name: 'Granulated Sugar',
    price: 8.99,
    retailPrice: 8.99,
    wholesalePrice: 7.50,
    category: 'Sweeteners',
    image: 'https://picsum.photos/seed/sugar/600/400',
    description: 'Fine granulated white sugar for all your baking needs.',
    rating: 4.5,
    shopId: 's1'
  },
  {
    id: '4',
    name: 'Whole Wheat Flour',
    price: 15.00,
    retailPrice: 15.00,
    wholesalePrice: 12.80,
    category: 'Grains',
    image: 'https://picsum.photos/seed/flour/600/400',
    description: 'Nutritious whole wheat flour for healthy bread and pastries.',
    rating: 4.3,
    shopId: 's2'
  },
  {
    id: '5',
    name: 'Extra Virgin Olive Oil',
    price: 24.99,
    retailPrice: 24.99,
    wholesalePrice: 21.00,
    category: 'Oils',
    image: 'https://picsum.photos/seed/oliveoil/600/400',
    description: 'Cold-pressed extra virgin olive oil from premium olives.',
    rating: 4.6,
    shopId: 's1'
  },
  {
    id: '6',
    name: 'Yellow Maize',
    price: 32.00,
    retailPrice: 32.00,
    wholesalePrice: 28.50,
    category: 'Grains',
    image: 'https://picsum.photos/seed/maize/600/400',
    description: 'High-grade yellow maize for industrial and domestic use.',
    rating: 4.9,
    shopId: 's2'
  }
];
