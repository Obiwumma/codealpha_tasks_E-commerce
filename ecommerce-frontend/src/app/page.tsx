/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ProtectedRoute from './components/ProtectedRoute';

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:3000/api/products', { 
      cache: 'no-store' 
    });
    if (!res.ok) throw new Error('Failed to fetch catalog');
    const data = await res.json();
    return data.productsList || data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array as fallback if API fails
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <ProtectedRoute>
      <div className="bg-white text-black antialiased min-h-screen flex flex-col font-sans">
        <main className="grow pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
          
          {/* HeroSection */}
          <section className="flex flex-col md:flex-row items-center justify-between mb-24 md:mb-32">
            <div className="md:w-1/2 flex flex-col items-start pr-0 md:pr-12 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight">
                Premium Football<br />Jerseys
              </h1>
              <p className="text-lg md:text-xl text-black mb-8 font-medium">
                Clean premium jerseys
              </p>
              <button className="border border-black px-8 py-3 text-black hover:bg-black hover:text-white transition-colors duration-200 rounded-none text-sm font-semibold tracking-wide uppercase">
                Shop
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img 
                alt="Hero Featured Jersey" 
                className="max-w-full h-auto object-contain w-3/4 md:w-full" 
                src="https://i.pinimg.com/736x/14/76/aa/1476aab690cfbe44b056b8f27850be00.jpg" 
                style={{ maxHeight: '500px' }} 
              />
            </div>
          </section>

          {/* FeaturedSection - Dynamic Grid */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">Featured Jerseys</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="block h-full">
                  <article className="border border-black rounded-none flex flex-col group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-gray-50 h-full">
                    
                    {/* Image Container */}
                    <div className="p-6 grow flex items-center justify-center bg-white border-b border-black overflow-hidden relative min-h-62.5">
                      <img 
                        alt={product.title} 
                        className="max-w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 absolute inset-0 m-auto" 
                        src={product.imageUrl} 
                        style={{ maxHeight: '250px', padding: '1.5rem' }} 
                      />
                    </div>
                    
                    {/* Text Container */}
                    <div className="p-4 flex flex-col justify-between bg-white h-22.5">
                      <h3 className="text-sm font-semibold mb-1 truncate" title={product.title}>
                        {product.title}
                      </h3>
                      {/* CHANGED TO DOLLARS HERE */}
                      <p className="text-sm font-bold">
                        ${parseFloat(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                  </article>
                </Link>
              ))}
              
              {/* Fallback state if no products load */}
              {products.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <p>No jerseys available at the moment. Please check back later.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}