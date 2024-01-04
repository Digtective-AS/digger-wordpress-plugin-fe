import { create } from 'zustand';
import {dataFetch, dataFetchDigger, onlineDataFetch} from "../axios/customAxios.ts";

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
      dataFetch.defaults.headers.Authorization = `Bearer ${loginToken}`;
      onlineDataFetch.defaults.headers.Authorization = `Bearer ${loginToken}`;
      dataFetchDigger.defaults.headers.Authorization = `Bearer ${loginToken}`;

      return {
        token: loginToken,
        isLoggedIn: true,
      };
    });
  },

  logout: () => {
    set(() => {
      dataFetch.defaults.headers.Authorization = 'Bearer null';
      onlineDataFetch.defaults.headers.Authorization = 'Bearer null';
      dataFetchDigger.defaults.headers.Authorization = 'Bearer null';

      return {
        token: null,
        isLoggedIn: false,
      };
    });
  },
}));
