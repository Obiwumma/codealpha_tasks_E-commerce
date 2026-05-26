import Link from 'next/link';
import AddToCartButton from '@/app/components/AddToCartButton';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// 1. Define the blueprint so TypeScript is happy
interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

// 2. Build the fetcher function
async function getSingleProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    // If the backend returns a 404, we catch it here
    return null;
  }

  const data = await res.json();
  return data.product as Product; 
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 3. Call your fetcher function
  const product = await getSingleProduct(id);

  // 4. Handle the 404 case gracefully on the frontend
  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-white font-sans">
        <h1 className="text-2xl font-bold text-black mb-4">Product not found 🕵️‍♂️</h1>
        <Link href="/" className="text-gray-500 underline hover:text-black transition-colors block">
          ← Go back home
        </Link>
      </main>
    );
  }

  // 5. Build the exact matching UI
  return (
    <ProtectedRoute>
      <div className="antialiased min-h-screen flex flex-col items-center justify-center p-4 md:p-12 bg-white font-sans text-black">
        
        {/* BEGIN: Main Container */}
        <div className="w-full max-w-6xl mx-auto flex flex-col space-y-12 bg-white relative">
          
          {/* BEGIN: Header */}
          <header className="w-full flex justify-between items-center py-6 px-4 md:px-0">
            {/* Back Button */}
            <Link href="/" aria-label="Go back" className="p-2 hover:bg-gray-100 transition-colors inline-block">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 19.5L8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </Link>
            
            {/* Right Icons */}
            {/* <div className="flex space-x-6 items-center"> */}
              {/* Theme Toggle (Sun) */}
              {/* <button aria-label="Toggle theme" className="p-2 hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button> */}
              {/* Profile */}
              {/* <button aria-label="User profile" className="p-2 hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button> */}
              {/* Bag */}
              {/* <button aria-label="Shopping bag" className="p-2 hover:bg-gray-100 transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button> */}
            {/* </div> */}
          </header>
          {/* END: Header */}

          {/* BEGIN: Product Details Content */}
          <main className="flex flex-col lg:flex-row w-full gap-12 lg:gap-24 items-start px-4 md:px-0">
            
            {/* Left: Product Image */}
            <div className="w-full lg:w-1/2 flex justify-center bg-gray-50 border border-gray-100 p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt={product.title} 
                className="w-full h-auto object-contain max-h-150 object-center mix-blend-multiply" 
                src={product.imageUrl}
              />
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-8 pt-4 lg:pt-12">
              
              {/* Title & Price */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900">
                  {product.title}
                </h1>
                <p className="text-2xl font-semibold text-gray-900">
                  ₦{parseFloat(product.price).toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                  {product.description}
                </p>
              </div>

              {/* Selectors Container (Visuals only for layout matching) */}
              <div className="space-y-8 pt-4">
                {/* Size Selector */}
                {/* <div className="space-y-3">
                  <span className="block text-xs font-bold text-gray-900 tracking-wider uppercase">Size</span>
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 border border-gray-300 flex items-center justify-center text-sm font-medium hover:border-black transition-colors focus:outline-none rounded-none text-gray-900">S</button>
                    <button className="w-10 h-10 border border-gray-300 flex items-center justify-center text-sm font-medium hover:border-black transition-colors focus:outline-none rounded-none text-gray-900">L</button>
                    <button className="w-10 h-10 bg-black border border-black flex items-center justify-center text-sm font-medium text-white hover:bg-gray-800 transition-colors focus:outline-none rounded-none">M</button>
                    <button className="w-10 h-10 border border-gray-300 flex items-center justify-center text-sm font-medium hover:border-black transition-colors focus:outline-none rounded-none text-gray-900">XL</button>
                  </div>
                </div> */}

                {/* Quantity Selector */}
                {/* <div className="space-y-3">
                  <span className="block text-xs font-bold text-gray-900 tracking-wider uppercase">Quantity</span>
                  <div className="inline-flex border border-gray-300">
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none text-gray-600 border-r border-gray-300 rounded-none">-</button>
                    <div className="w-10 h-8 flex items-center justify-center text-sm font-medium text-gray-900">1</div>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none text-gray-600 border-l border-gray-300 rounded-none">+</button>
                  </div>
                </div> */}
              </div>

              {/* Plugin AddToCartButton component here */}
              <div className="pt-6">
                <AddToCartButton product={product} />
              </div>

            </div>
          </main>
          {/* END: Product Details Content */}
        </div>
        {/* END: Main Container */}
      </div>
    </ProtectedRoute>
  );
}