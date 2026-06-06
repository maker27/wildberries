import { createPersistedStore } from '@/shared/lib/storage/createPersistedStore';

import type { User } from './types';

const USER_STORAGE_KEY = 'wb-user';
export const AUTH_COOKIE_NAME = 'wb-auth';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

function setAuthCookie(): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; samesite=lax`;
}

function clearAuthCookie(): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

export const useUserStore = createPersistedStore<UserState>(
  (set) => ({
    user: null,

    setUser: (user) => {
      setAuthCookie();
      set({ user });
    },

    logout: () => {
      clearAuthCookie();
      set({ user: null });
    },
  }),
  {
    name: USER_STORAGE_KEY,
    partialize: (state) => ({ user: state.user }),
  },
);
