export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stock?: number;
  brand: string;
  weight?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: 'card' | 'digital' | 'cash';
}

export interface ShippingInfo {
  address: string;
  city: string;
  phone: string;
  notes?: string;
  deliveryType?: 'standard' | 'express';
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  shippingCost: number;
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}