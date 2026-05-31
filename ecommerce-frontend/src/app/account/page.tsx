"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import ProtectedRoute from '../components/ProtectedRoute';

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  totalAmount: string;
  status: string;
}

export default function AccountDashboard() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) {
      router.push('/login');
      return;
    }

    async function fetchOrders() {
      try {
        const res = await fetch('https://ecommerce-api-1uf6.onrender.com/api/orders/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user, token, router]);

  if (loading) return <div className="min-h-screen bg-white text-black flex items-center justify-center font-bold tracking-widest text-xs">LOADING ENTRY...</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white text-black py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto grid grid-col-1 md:grid-cols-4 gap-12">
        
        {/* Left Side: Mini Side Control Dock */}
        <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-neutral-200 pb-8 md:pb-0 md:pr-8">
          <div className="w-16 h-16 bg-black rounded-full mb-4 flex items-center justify-center text-white font-black text-xl">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">{user?.name}</h2>
          <p className="text-xs text-neutral-400 font-medium truncate mb-6">{user?.email}</p>
          
          <button onClick={() => { logout(); router.push('/login'); }} className="text-xs font-black tracking-wider text-red-500 uppercase hover:text-red-700 transition-colors">
            Logout Session
          </button>
        </div>

        {/* Right Side: Structured Panels */}
        <div className="md:col-span-3 space-y-12">
          
          {/* Section A: Credentials Panel */}
          <section className="border border-black p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-6">My Account Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Full Name</span>
                <p className="text-base font-bold uppercase">{user?.name}</p>
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Email</span>
                <p className="text-base font-bold">{user?.email}</p>
              </div>
            </div>
          </section>

          {/* Section B: Receipts Log */}
          <section className="border border-black p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Recent Orders</h3>
              <span className="text-xs font-black uppercase tracking-wider text-neutral-400">Total: ({orders.length})</span>
            </div>

            {orders.length === 0 ? (
              <div className="border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-400 font-bold uppercase">No transactions found</div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-black p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-xs text-neutral-400 font-bold uppercase">Order reference #00{order.id}</span>
                      <h4 className="text-sm font-bold uppercase tracking-tight mt-1">Jersey Acquisition</h4>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-neutral-100 text-black border border-neutral-200">
                        {order.status}
                      </span>
                      <p className="text-base font-black">₦{parseFloat(order.totalAmount).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
}