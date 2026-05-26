"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token); // Pull token from your Zustand store
  
  // We use this state to prevent hydration mismatches between server and client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // If there is no token, teleport them to the login page
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // While checking the token, or if no token exists, show nothing (or a loading spinner)
  if (!isMounted || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-black font-bold uppercase tracking-widest text-sm animate-pulse">
          Verifying Access...
        </p>
      </div>
    );
  }

  // If token exists, render the protected page!
  return <>{children}</>;
}