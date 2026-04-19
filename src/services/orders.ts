import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface OrderItemInput {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderInput {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  items?: OrderItemInput[];
  total?: number;
  subtotal?: number;
  gst?: number;
  delivery?: number;
  discount?: number;
  paymentMethod?: string;
  coupon?: string;
  notes?: string;
  requirement?: string;
  quantityRequested?: number | null;
  status?: 'pending' | 'processing' | 'delivered';
  orderType?: 'quote' | 'purchase';
  source: 'quote-form' | 'homepage-cart' | 'checkout';
}

export async function createOrder(input: CreateOrderInput) {
  const docRef = await addDoc(collection(db, 'orders'), {
    name: input.name,
    phone: input.phone,
    email: input.email ?? '',
    location: input.location ?? 'Not provided',
    items: input.items ?? [],
    total: input.total ?? 0,
    subtotal: input.subtotal ?? input.total ?? 0,
    gst: input.gst ?? 0,
    delivery: input.delivery ?? 0,
    discount: input.discount ?? 0,
    paymentMethod: input.paymentMethod ?? '',
    coupon: input.coupon ?? '',
    notes: input.notes ?? '',
    requirement: input.requirement ?? '',
    quantityRequested: input.quantityRequested ?? null,
    status: input.status ?? 'pending',
    orderType: input.orderType ?? 'purchase',
    source: input.source,
    createdAt: Timestamp.now()
  });

  return docRef.id;
}
