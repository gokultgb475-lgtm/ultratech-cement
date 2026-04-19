import { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, query, onSnapshot, Timestamp } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react';

interface Order {
  status: string;
  total: number;
  createdAt: Timestamp;
}

export function Analytics() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });

  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersData = snapshot.docs.map((orderDoc) => {
          const data = orderDoc.data() as Partial<Order>;
          return {
            status:
              data.status === 'processing' || data.status === 'delivered' || data.status === 'pending'
                ? data.status
                : 'pending',
            total: typeof data.total === 'number' ? data.total : 0,
            createdAt:
              data.createdAt && typeof data.createdAt === 'object' && 'toDate' in data.createdAt
                ? data.createdAt
                : Timestamp.now()
          } as Order;
        });
        setOrders(ordersData);

        const totalOrders = ordersData.length;
        const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
        const pendingOrders = ordersData.filter(o => o.status === 'pending').length;
        const deliveredOrders = ordersData.filter(o => o.status === 'delivered').length;

        setStats({
          totalOrders,
          totalRevenue,
          averageOrderValue: totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
          pendingOrders,
          deliveredOrders
        });

        setLoading(false);
      },
      (listenerError) => {
        console.error('Error loading analytics:', listenerError);
        setOrders([]);
        setError(
          listenerError.code === 'permission-denied'
            ? 'Firestore read access is blocked for orders. Update your rules for authenticated users.'
            : 'Unable to load analytics from Firestore.'
        );
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Prepare data for charts
  const statusData = [
    { name: 'Pending', value: stats.pendingOrders, color: '#FBBF24' },
    { name: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: '#60A5FA' },
    { name: 'Delivered', value: stats.deliveredOrders, color: '#4ADE80' }
  ];

  interface DailyRevenue {
    date: string;
    revenue: number;
  }

  const dailyRevenue = orders.reduce((acc: DailyRevenue[], order) => {
    const date = order.createdAt?.toDate?.() || new Date();
    const dateStr = date.toLocaleDateString();
    const existing = acc.find((d: DailyRevenue) => d.date === dateStr);
    if (existing) {
      existing.revenue += order.total || 0;
    } else {
      acc.push({ date: dateStr, revenue: order.total || 0 });
    }
    return acc;
  }, []).slice(-7);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-[#FF4D2E]/20 border-t-[#FF4D2E] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#8B919D]">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="corp-panel p-6 border-red-500/30 bg-red-500/5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-300">Analytics could not be loaded</p>
            <p className="text-sm text-red-200/90 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="font-display font-bold text-3xl text-white">Analytics Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-blue-400' },
          { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
          { label: 'Avg Order Value', value: `₹${stats.averageOrderValue.toLocaleString()}`, icon: TrendingUp, color: 'text-yellow-400' },
          { label: 'Pending Orders', value: stats.pendingOrders, icon: Package, color: 'text-orange-400' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="corp-panel p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#5A6474] uppercase font-medium mb-2">{stat.label}</p>
                  <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="corp-panel p-6">
          <h3 className="font-display font-semibold text-lg text-white mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{
                backgroundColor: '#141C2D',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#E8ECF4'
              }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Revenue */}
        <div className="corp-panel p-6">
          <h3 className="font-display font-semibold text-lg text-white mb-4">Daily Revenue (Last 7 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" stroke="#5A6474" />
              <YAxis stroke="#5A6474" />
              <Tooltip contentStyle={{
                backgroundColor: '#141C2D',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#E8ECF4'
              }} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF4D2E" 
                dot={{ fill: '#FF4D2E', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="corp-panel p-6">
          <p className="text-xs text-[#5A6474] uppercase font-medium mb-2">Delivery Rate</p>
          <p className="font-display font-bold text-2xl text-[#FF4D2E] mb-2">
            {stats.totalOrders > 0 ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) : 0}%
          </p>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div 
              className="bg-[#FF4D2E] h-2 rounded-full"
              style={{
                width: stats.totalOrders > 0 ? `${(stats.deliveredOrders / stats.totalOrders) * 100}%` : '0%'
              }}
            />
          </div>
        </div>

        <div className="corp-panel p-6">
          <p className="text-xs text-[#5A6474] uppercase font-medium mb-2">Processing Rate</p>
          <p className="font-display font-bold text-2xl text-blue-400 mb-2">
            {stats.totalOrders > 0 ? Math.round((orders.filter(o => o.status === 'processing').length / stats.totalOrders) * 100) : 0}%
          </p>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div 
              className="bg-blue-400 h-2 rounded-full"
              style={{
                width: stats.totalOrders > 0 ? `${(orders.filter(o => o.status === 'processing').length / stats.totalOrders) * 100}%` : '0%'
              }}
            />
          </div>
        </div>

        <div className="corp-panel p-6">
          <p className="text-xs text-[#5A6474] uppercase font-medium mb-2">Pending Rate</p>
          <p className="font-display font-bold text-2xl text-yellow-400 mb-2">
            {stats.totalOrders > 0 ? Math.round((stats.pendingOrders / stats.totalOrders) * 100) : 0}%
          </p>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div 
              className="bg-yellow-400 h-2 rounded-full"
              style={{
                width: stats.totalOrders > 0 ? `${(stats.pendingOrders / stats.totalOrders) * 100}%` : '0%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
