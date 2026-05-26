"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const setAuthData = useAuthStore((state) => state.login);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Write token and user data to Zustand + LocalStorage instantly
      setAuthData(data.user, data.token);
      
      // Teleport user to home page
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans overflow-hidden">
      
      {/* Left Panel: Image */}
      <div className="relative hidden md:block w-1/2 h-screen bg-black">
        {/* Top Left Text */}
        <div className="absolute top-10 left-10 z-10">
          {/* <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
            Locker Room
          </h1> */}
        </div>
        
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://i.pinimg.com/736x/fb/77/b8/fb77b8e004022ba816c40c8d2e37005d.jpg" 
          alt="Dark Locker Room" 
          className="w-full h-full object-cover object-center opacity-90"
        />
        {/* Subtle dark gradient to ensure text readability and match the moody vibe */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center p-6 bg-white overflow-y-auto">
        
        <div className="w-full max-w-125 border border-gray-400 p-10 md:p-14 bg-white">
          
          <div className="mb-8">
            <h2 className="text-[28px] font-medium text-black tracking-normal">
              Welcome back
            </h2>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-6 w-full">
            
            {/* Display Error Message if any */}
            {error && (
              <div className="p-3 border border-red-500 bg-red-50 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Email Field */}
            <input 
              className="w-full border border-gray-400 bg-white p-4 text-sm text-black placeholder:text-gray-600 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none" 
              id="email" 
              name="email" 
              placeholder="Email" 
              required 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Field */}
            <input 
              className="w-full border border-gray-400 bg-white p-4 text-sm text-black placeholder:text-gray-600 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none" 
              id="password" 
              name="password" 
              placeholder="Password" 
              required 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Action Button */}
            <div className="mt-2">
              <button 
                disabled={loading}
                className="w-full py-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed rounded-none mb-4" 
                type="submit"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              <Link href={"/register"} className="text-sm font-bold hover:text-gray-700 transition-colors">
                Don&apos;t have an account? Register here
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}