// src/components/AddToCartButton.tsx
"use client"; // CRITICAL: This makes it a Client Component!

import { useCartStore } from '../store/cartStore';

interface ProductProps {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
}

// We pass the product details into the button as 'props'
export default function AddToCartButton({ product }: { product: ProductProps }) {
  // 1. Connect to our Zustand brain and grab the 'addItem' function
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // 2. Format the item to match what Zustand expects
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
    
    // Just for testing, let's pop up an alert so you know it worked!
    alert(`${product.title} added to cart!`);
  };

  return (
    <button 
      // YOUR TURN: Add the onClick event to trigger handleAddToCart!
      onClick={handleAddToCart}
      className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full font-bold transition-colors"
    >
      Add to Cart
    </button>
  );
}