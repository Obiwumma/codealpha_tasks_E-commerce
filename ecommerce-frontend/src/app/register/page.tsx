"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  
  // Local state aligned with the new UI design
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    // Quick validation to ensure passwords match before sending
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send the data to your Express backend
      const res = await fetch('https://ecommerce-api-1uf6.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Sending email and password based on the visual form fields
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      // If successful, send them to the login page
      router.push('/login?registered=true');
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      
      {/* Left Panel: Image */}
      <div className="relative hidden md:block w-1/2 h-screen">
        {/* Absolute Title positioned over the image */}
        <div className="absolute top-8 left-10 z-10">
          {/* <h1 className="text-4xl font-extrabold text-black tracking-tight">
            Locker Room
          </h1> */}
        </div>
        
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://i.pinimg.com/1200x/3b/2b/20/3b2b20b5364bb5cad0b518e8889d3637.jpg" 
          alt="Locker Room" 
          className="w-full h-full object-cover"
        />
        {/* Optional: Slight red/dark tint overlay to match the vibe of your provided image */}
        <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center p-6 bg-white overflow-y-auto">
        
        <div className="w-full max-w-125 border border-gray-400 p-10 md:p-14">
          <h2 className="text-[28px] font-medium text-black mb-8">
            Create an account
          </h2>
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            
            {/* Email Field - Full Width */}
            <input 
              type="email" 
              placeholder="Email"
              required
              className="w-full border border-gray-400 p-4 text-black placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {/* Password Row - Half Width */}
            <div className="flex flex-col sm:flex-row gap-6">
              <input 
                type="password" 
                placeholder="Password"
                required
                className="w-full border border-gray-400 p-4 text-black placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <input 
                type="password" 
                placeholder="Confirm password"
                required
                className="w-full border border-gray-400 p-4 text-black placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white font-medium py-4 mt-2 text-sm transition-colors hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
            <Link href={"/login"} className="text-sm font-bold hover:text-gray-700 transition-colors">
              Already have an account? Sign in here
            </Link>

          </form>
        </div>

      </div>
    </div>
  );
}