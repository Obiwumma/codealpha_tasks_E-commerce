import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. We define exactly what a User looks like based on what our Express backend sends
interface User {
  id: number;
  name: string;
  email: string;
}

// 2. We define the blueprint for our Auth Memory
interface AuthState {
  user: User | null;       // Holds the user's details (null if logged out)
  token: string | null;    // Holds the digital wristband (null if logged out)
  
  // The actions we can take
  login: (user: User, token: string) => void; 
  logout: () => void;
}

// 3. We create the actual store using Zustand
export const useAuthStore = create<AuthState>()(
  // The 'persist' wrapper is the magic. It automatically syncs this state to LocalStorage
  persist(
    (set) => ({
      user: null,
      token: null,
      
      // When the user logs in successfully, we update the state with their data
      login: (userData, tokenData) => set({ 
        user: userData, 
        token: tokenData 
      }),
      
      // When they log out, we wipe the memory clean (which also wipes LocalStorage)
      logout: () => set({ 
        user: null, 
        token: null 
      }),
    }),
    {
      // This is the name of the "vault" inside the browser's LocalStorage. 
      // If you press F12 in your browser and go to Application -> Local Storage, you will see this!
      name: 'lockerroom-auth-storage', 
    }
  )
);