import { useState, useEffect } from 'react';
import type { Product, CartItem, PaymentMethod } from '../types/petshop.types';

export const usePetShop = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Royal Canin Adult',
      description: 'Alimento completo para perros adultos de razas medianas',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
      category: 'Alimentos',
      rating: 4.8,
      reviews: 124,
      inStock: true,
      brand: 'Royal Canin'
    },
    {
      id: '2',
      name: 'Pelota Kong Classic',
      description: 'Juguete resistente para perros, ideal para masticar',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      category: 'Juguetes',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      brand: 'Kong'
    },
    {
      id: '3',
      name: 'Collar LED Premium',
      description: 'Collar con luces LED recargables para paseos nocturnos',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400',
      category: 'Accesorios',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      brand: 'PetSafe'
    },
    {
      id: '4',
      name: 'Shampoo Hipoalergénico',
      description: 'Shampoo suave para pieles sensibles, sin químicos',
      price: 18.50,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      category: 'Cuidado',
      rating: 4.5,
      reviews: 67,
      inStock: true,
      brand: 'Earthbath'
    },
    {
      id: '5',
      name: 'Whiskas Adult Gato',
      description: 'Alimento balanceado para gatos adultos con pollo',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400',
      category: 'Alimentos',
      rating: 4.4,
      reviews: 203,
      inStock: true,
      brand: 'Whiskas'
    },
    {
      id: '6',
      name: 'Rascador Torre',
      description: 'Torre rascadora de 120cm con múltiples niveles',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400',
      category: 'Juguetes',
      rating: 4.9,
      reviews: 78,
      inStock: true,
      brand: 'SmartCat'
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const paymentMethods: PaymentMethod[] = [
    { id: 'visa', name: 'Visa', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg', type: 'card' },
    { id: 'mastercard', name: 'Mastercard', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg', type: 'card' },
    { id: 'paypal', name: 'PayPal', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg', type: 'digital' },
    { id: 'pse', name: 'PSE', icon: 'https://www.pse.com.co/sites/default/files/2021-06/logo-pse.png', type: 'digital' },
    { id: 'nequi', name: 'Nequi', icon: 'https://www.nequi.com.co/assets/images/logo-nequi.svg', type: 'digital' },
    { id: 'cash', name: 'Efectivo', icon: 'fas fa-money-bill-wave', type: 'cash' }
  ];

  const categories = ['Todos', 'Alimentos', 'Juguetes', 'Accesorios', 'Cuidado'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    products: filteredProducts,
    cart,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    paymentMethods,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  };
};