import { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, query, onSnapshot, updateDoc, doc, Query, Timestamp } from 'firebase/firestore';
import { CheckCircle, Clock, Truck, Phone, MapPin, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  name: string;
  phone: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  total: number;
  location: string;
  status: 'pending' | 'processing' | 'delivered';
  createdAt: Timestamp;
}

export function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'delivered'>('all');

  const getTimestampMs = (value: unknown) => {
    if (value && typeof value === 'object' && 'toMillis' in value && typeof value.toMillis === 'function') {
      return value.toMillis();
    }
    if (value instanceof Date) {
      return value.getTime();
    }
    return 0;
  };

  const getFriendlyFirestoreError = (code?: string) => {
    switch (code) {
      case 'permission-denied':
        return 'Firebase blocked access to orders. Update Firestore rules to allow authenticated users to read the orders collection.';
      case 'unavailable':
        return 'Firestore is temporarily unavailable. Check your internet connection and try again.';
      default:
        return 'Unable to load orders from Firestore.';
    }
  };

  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    let q: Query;

    if (filter === 'all') {
      q = query(ordersRef);
    } else {
      q = query(ordersRef);
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersData = snapshot.docs
          .map((orderDoc) => {
            const data = orderDoc.data() as Partial<Order>;

            return {
              id: orderDoc.id,
              name: data.name ?? 'Unknown customer',
              phone: data.phone ?? 'Not provided',
              items: Array.isArray(data.items) ? data.items : [],
              total: typeof data.total === 'number' ? data.total : 0,
              location: data.location ?? 'Not provided',
              status:
                data.status === 'processing' || data.status === 'delivered' || data.status === 'pending'
                  ? data.status
                  : 'pending',
              createdAt:
                data.createdAt && typeof data.createdAt === 'object' && 'toDate' in data.createdAt
                  ? data.createdAt
                  : Timestamp.now()
            } as Order;
          })
          .sort((a, b) => getTimestampMs(b.createdAt) - getTimestampMs(a.createdAt));

        const filtered = filter === 'all'
          ? ordersData
          : ordersData.filter((order) => order.status === filter);

        setOrders(filtered);
        setLoading(false);
      },
      (listenerError) => {
        console.error('Error loading orders:', listenerError);
        setOrders([]);
        setError(getFriendlyFirestoreError(listenerError.code));
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [filter]);

  const updateOrderStatus = async (orderId: string, newStatus: 'pending' | 'processing' | 'delivered') => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      });
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'processing':
        return <Truck className="w-5 h-5 text-blue-400" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'processing':
        return 'text-blue-400';
      case 'delivered':
        return 'text-green-400';
      default:
        return 'text-[#8B919D]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="font-display font-bold text-3xl text-white">
          Orders ({orders.length})
        </h2>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'processing', 'delivered'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-[#FF4D2E] text-white shadow-[0_6px_16px_rgba(255,77,46,0.35)]'
                  : 'bg-white/5 border border-white/10 text-[#8B919D] hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders grid/list */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-[#FF4D2E]/20 border-t-[#FF4D2E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8B919D]">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="corp-panel p-6 border-red-500/30 bg-red-500/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-300">Orders could not be loaded</p>
              <p className="text-sm text-red-200/90 mt-1">{error}</p>
            </div>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="corp-panel p-12 text-center">
          <p className="text-[#8B919D]">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="corp-panel p-6 hover:border-[#FF4D2E]/30 transition-all">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left side - Order info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white">
                        {order.name}
                      </h3>
                      <p className="text-sm text-[#5A6474] mt-1">
                        Order #{order.id.slice(-8)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-[#FF4D2E]" />
                      <span className="text-[#8B919D]">{order.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-[#FF4D2E]" />
                      <span className="text-[#8B919D]">{order.location}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="corp-panel-soft p-4">
                    <p className="text-xs font-medium text-[#5A6474] uppercase mb-3">Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-[#E8ECF4]">{item.name} x {item.quantity}</span>
                          <span className="text-[#FF4D2E]">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total and Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm text-[#5A6474]">
                      {order.createdAt.toDate().toLocaleDateString()}
                    </span>
                    <span className="font-display font-bold text-lg text-[#FF4D2E]">
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Right side - Status management */}
                <div className="flex flex-col justify-between">
                  <div className="corp-panel-soft p-4">
                    <p className="text-xs font-medium text-[#5A6474] uppercase mb-3">Update Status</p>
                    <div className="space-y-2">
                      {(['pending', 'processing', 'delivered'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            order.status === status
                              ? 'bg-[#FF4D2E] text-white'
                              : 'bg-white/5 border border-white/10 text-[#8B919D] hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp notification */}
                  <a
                    href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(order.name)}%2C%20Order%20%23${order.id.slice(-8)}%20is%20${order.status}.%20Total%3A%20%E2%82%B9${order.total.toLocaleString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors text-center"
                  >
                    Send WhatsApp Update
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
