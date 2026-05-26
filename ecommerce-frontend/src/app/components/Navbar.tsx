"use client";

import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout(); 
    window.location.href = '/login'; 
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO - Made slightly smaller on mobile to save space */}
        <Link href="/" className="text-xl sm:text-2xl font-extrabold tracking-widest uppercase">
          LOCKERROOM.
        </Link>

        {/* RIGHT SIDE NAVIGATION - Reduced spacing on mobile */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          
          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* 🚨 FIX: Hidden on mobile (hidden), visible on screens 'sm' and larger (sm:block) */}
              <span className="hidden sm:block text-sm text-gray-300">
                Welcome, <span className="font-bold text-white">{user.name}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="text-xs sm:text-sm font-bold border border-white px-2 py-1 sm:px-3 sm:py-1 hover:bg-white hover:text-black transition-colors"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-xs sm:text-sm font-bold hover:text-gray-300 transition-colors">
                LOG IN
              </Link>
            </div>
          )}

          {/* CART BUTTON */}
          <Link href="/cart" className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-sm sm:text-base">🛒</span>
            <span className="bg-white text-black text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-full">
              {totalItems}
            </span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}