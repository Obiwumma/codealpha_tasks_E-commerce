"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // When this page loads, instantly empty the shopping cart!
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="p-8 max-w-4xl mx-auto text-center mt-20">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your order. We are processing it right now.
      </p>
      <Link href="/" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
        Continue Shopping
      </Link>
    </main>
  );
}