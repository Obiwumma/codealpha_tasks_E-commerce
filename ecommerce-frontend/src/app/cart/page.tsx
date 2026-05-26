/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem); // Connect to deletion mechanism

  const totalPrice = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0); 

  if (items.length === 0) {
    return (
      <main className="p-8 max-w-4xl mx-auto text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty 😢</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back to shopping
        </Link>
      </main>
    );
  }

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }), 
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong with checkout.");
    }
  };

  return (
    <main className="p-8 max-w-4xl mx-auto mt-8 text-black bg-white">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight uppercase">Shopping Cart</h1>
      
      <div className="bg-white border border-black p-6 mb-8 rounded-none">
        {/* Loop through cart items */}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-neutral-200 py-6 last:border-b-0 last:pb-0 first:pt-0">
            <div className="flex items-center gap-6">
              <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-none object-cover border border-neutral-200" />
              <div>
                <h2 className="font-bold text-lg uppercase tracking-tight mb-1">{item.title}</h2>
                <p className="text-neutral-500 text-sm font-medium">Qty: {item.quantity}</p>
                
                {/* Visual Delete Button Trigger */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-xs font-bold text-red-500 uppercase tracking-wider mt-2 block hover:text-red-700 transition-colors"
                >
                  Remove Item
                </button>
              </div>
            </div>
            <p className="font-bold text-lg">₦{(Number(item.price) * item.quantity).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Checkout Summary Block */}
      <div className="bg-neutral-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-black gap-4 rounded-none">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-1">Total Amount</p>
          <p className="text-3xl font-black">₦{totalPrice.toLocaleString()}</p>
        </div>
        <button onClick={handleCheckout} className="w-full sm:w-auto bg-black text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-none">
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}