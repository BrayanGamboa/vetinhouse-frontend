import { useState } from 'react';
import type { Product, CartItem, PaymentMethod } from '../types/petshop.types';

export const usePetShop = () => {
  const [products] = useState<Product[]>([
    // Alimentos para Perros
    {
      id: '1',
      name: 'Royal Canin Adult Medium',
      description: 'Alimento completo para perros adultos de razas medianas. Fórmula balanceada con proteínas de alta calidad.',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
      category: 'Alimentos',
      rating: 4.8,
      reviews: 124,
      inStock: true,
      stock: 45,
      brand: 'Royal Canin',
      weight: '15kg'
    },
    {
      id: '2',
      name: 'Dog Chow Adulto Premium',
      description: 'Alimento premium con pollo real. Rico en vitaminas y minerales esenciales.',
      price: 38.50,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
      category: 'Alimentos',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      stock: 32,
      brand: 'Dog Chow',
      weight: '21kg'
    },
    {
      id: '3',
      name: 'Hill\'s Science Diet Puppy',
      description: 'Nutrición científicamente formulada para cachorros en crecimiento.',
      price: 52.99,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
      category: 'Alimentos',
      rating: 4.9,
      reviews: 156,
      inStock: true,
      stock: 28,
      brand: 'Hill\'s',
      weight: '12kg'
    },
    
    // Alimentos para Gatos
    {
      id: '4',
      name: 'Whiskas Adult Pollo',
      description: 'Alimento balanceado para gatos adultos con pollo real y vitaminas.',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400',
      category: 'Alimentos',
      rating: 4.4,
      reviews: 203,
      inStock: true,
      stock: 56,
      brand: 'Whiskas',
      weight: '10kg'
    },
    {
      id: '5',
      name: 'Felix Sensations Mixto',
      description: 'Variedad de sabores en paté para gatos exigentes. Pack de 24 sobres.',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400',
      category: 'Alimentos',
      rating: 4.7,
      reviews: 145,
      inStock: true,
      stock: 67,
      brand: 'Felix',
      weight: '1.2kg'
    },
    
    // Juguetes
    {
      id: '6',
      name: 'Pelota Kong Classic Roja',
      description: 'Juguete resistente de caucho natural. Ideal para masticar y rellenar con premios.',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      category: 'Juguetes',
      rating: 4.9,
      reviews: 289,
      inStock: true,
      stock: 120,
      brand: 'Kong'
    },
    {
      id: '7',
      name: 'Rascador Torre Grande',
      description: 'Torre rascadora de 120cm con múltiples niveles, casita y hamaca.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400',
      category: 'Juguetes',
      rating: 4.8,
      reviews: 78,
      inStock: true,
      stock: 15,
      brand: 'SmartCat'
    },
    {
      id: '8',
      name: 'Set de Juguetes Interactivos',
      description: 'Pack de 10 juguetes variados para perros: pelotas, cuerdas y mordedores.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400',
      category: 'Juguetes',
      rating: 4.5,
      reviews: 167,
      inStock: true,
      stock: 88,
      brand: 'Pet Toys'
    },
    {
      id: '9',
      name: 'Varita Láser Gatos',
      description: 'Láser interactivo con 5 patrones de luz. Diversión garantizada.',
      price: 12.50,
      image: 'https://images.unsplash.com/photo-1511694009171-3cdddf4484ff?w=400',
      category: 'Juguetes',
      rating: 4.6,
      reviews: 234,
      inStock: true,
      stock: 95,
      brand: 'Cat Toy'
    },
    
    // Accesorios
    {
      id: '10',
      name: 'Collar LED Premium Recargable',
      description: 'Collar con luces LED multicolor recargables por USB. Visible hasta 500m.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400',
      category: 'Accesorios',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      stock: 42,
      brand: 'PetSafe'
    },
    {
      id: '11',
      name: 'Correa Retráctil 5m',
      description: 'Correa extensible hasta 5 metros con sistema de frenado y bloqueo.',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400',
      category: 'Accesorios',
      rating: 4.8,
      reviews: 198,
      inStock: true,
      stock: 73,
      brand: 'Flexi'
    },
    {
      id: '12',
      name: 'Cama Ortopédica Memory Foam',
      description: 'Cama con espuma viscoelástica para mayor confort. Funda lavable.',
      price: 65.99,
      image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400',
      category: 'Accesorios',
      rating: 4.9,
      reviews: 112,
      inStock: true,
      stock: 23,
      brand: 'PetFusion'
    },
    {
      id: '13',
      name: 'Transportadora Airline Approved',
      description: 'Transportadora rígida aprobada para viajes en avión. Tamaño mediano.',
      price: 78.50,
      image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=400',
      category: 'Accesorios',
      rating: 4.7,
      reviews: 89,
      inStock: false,
      stock: 0,
      brand: 'Petmate'
    },
    {
      id: '14',
      name: 'Bebedero Automático 3L',
      description: 'Fuente de agua con filtro de carbón activado. Circulación continua.',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?w=400',
      category: 'Accesorios',
      rating: 4.6,
      reviews: 134,
      inStock: true,
      stock: 38,
      brand: 'Catit'
    },
    
    // Cuidado e Higiene
    {
      id: '15',
      name: 'Shampoo Hipoalergénico Premium',
      description: 'Shampoo suave para pieles sensibles, sin sulfatos ni químicos agresivos.',
      price: 18.50,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      category: 'Cuidado',
      rating: 4.5,
      reviews: 167,
      inStock: true,
      stock: 92,
      brand: 'Earthbath',
      weight: '500ml'
    },
    {
      id: '16',
      name: 'Kit Dental Completo',
      description: 'Incluye cepillo, pasta dental enzimática y dedales. Sabor a pollo.',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400',
      category: 'Cuidado',
      rating: 4.4,
      reviews: 78,
      inStock: true,
      stock: 65,
      brand: 'Petrodex'
    },
    {
      id: '17',
      name: 'Cortauñas Profesional',
      description: 'Cortauñas de acero inoxidable con protector de seguridad.',
      price: 14.50,
      image: 'https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=400',
      category: 'Cuidado',
      rating: 4.7,
      reviews: 203,
      inStock: true,
      stock: 87,
      brand: 'Safari'
    },
    {
      id: '18',
      name: 'Arena Sanitaria Aglomerante',
      description: 'Arena premium con control de olores y aglomeración instantánea. 10kg.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=400',
      category: 'Cuidado',
      rating: 4.6,
      reviews: 256,
      inStock: true,
      stock: 104,
      brand: 'Tidy Cats',
      weight: '10kg'
    },
    {
      id: '19',
      name: 'Toallitas Húmedas Desodorantes',
      description: 'Pack de 100 toallitas con aloe vera. Limpieza rápida sin agua.',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1591696331115-68e3e8c31fef?w=400',
      category: 'Cuidado',
      rating: 4.5,
      reviews: 145,
      inStock: true,
      stock: 126,
      brand: 'Pogi\'s'
    },
    {
      id: '20',
      name: 'Antipulgas y Garrapatas',
      description: 'Pipetas antipulgas de larga duración. Pack de 3 aplicaciones.',
      price: 28.99,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
      category: 'Cuidado',
      rating: 4.8,
      reviews: 189,
      inStock: true,
      stock: 56,
      brand: 'Frontline'
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const paymentMethods: PaymentMethod[] = [
    { id: 'visa', name: 'Visa', icon: 'fab fa-cc-visa', type: 'card' },
    { id: 'mastercard', name: 'Mastercard', icon: 'fab fa-cc-mastercard', type: 'card' },
    { id: 'amex', name: 'American Express', icon: 'fab fa-cc-amex', type: 'card' },
    { id: 'paypal', name: 'PayPal', icon: 'fab fa-cc-paypal', type: 'digital' },
    { id: 'pse', name: 'PSE', icon: 'fas fa-university', type: 'digital' },
    { id: 'nequi', name: 'Nequi', icon: 'fas fa-mobile-alt', type: 'digital' },
    { id: 'daviplata', name: 'Daviplata', icon: 'fas fa-wallet', type: 'digital' },
    { id: 'cash', name: 'Efectivo Contraentrega', icon: 'fas fa-money-bill-wave', type: 'cash' }
  ];

  const categories = ['Todos', 'Alimentos', 'Juguetes', 'Accesorios', 'Cuidado'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStock = !onlyInStock || product.inStock;
    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock || 999) }
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
    const product = products.find(p => p.id === productId);
    const maxQuantity = product?.stock || 999;
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, maxQuantity) }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getShippingCost = () => {
    const total = getTotalPrice();
    if (total >= 50) return 0; // Envío gratis
    if (total >= 30) return 3.99;
    return 5.99;
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
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    onlyInStock,
    setOnlyInStock,
    paymentMethods,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getShippingCost,
    getTotalItems,
    clearCart
  };
};