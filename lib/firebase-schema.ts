import { Timestamp } from 'firebase/firestore';

// This is just for reference - the collections will be created automatically

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'card' | 'mobile';
  createdAt: Timestamp;
}

interface Payment {
  orderId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'card' | 'mobile';
  createdAt: Timestamp;
}
