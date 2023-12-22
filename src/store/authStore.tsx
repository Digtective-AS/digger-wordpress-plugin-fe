import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (_loginToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),

  login: async (loginToken: string) => {
    set(() => {
      localStorage.setItem('token', loginToken);
      return {
        token: loginToken,
        isLoggedIn: true,
      };
    });
  },

  logout: () => {
    set(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userInitials');
      return {
        token: null,
        isLoggedIn: false,
      };
    });
  },
}));
