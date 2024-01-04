import { create } from 'zustand';
import {dataFetchDigger} from "../axios/customAxios.ts";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (_loginToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoggedIn: false,

  login: async (loginToken: string) => {
    set(() => {
      dataFetchDigger.defaults.headers.Authorization = `Bearer ${loginToken}`;

      return {
        token: loginToken,
        isLoggedIn: true,
      };
    });
  },

  logout: () => {
    set(() => {
      dataFetchDigger.defaults.headers.Authorization = 'Bearer null';

      return {
        token: null,
        isLoggedIn: false,
      };
    });
  },
}));
