import { create } from 'zustand';
import { UserProfile } from '../types';

interface AppState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));