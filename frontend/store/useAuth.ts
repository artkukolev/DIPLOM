import create from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'director' | 'admin' | 'student' | 'parent';

export interface User {
  role: Role;
  name: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
  }), { name: 'edu-auth' })
);
