'use client';

import { create } from 'zustand';
import { createJSONStorage, persist, type PersistOptions } from 'zustand/middleware';
import type { StateCreator } from 'zustand';

type PersistConfig<T> = Omit<PersistOptions<T, Partial<T>>, 'storage'>;

/**
 * Создаёт Zustand-стор с персистом в localStorage.
 * Гидрация ручная (skipHydration) — чтобы не было рассинхрона server/client разметки.
 */
export function createPersistedStore<T>(initializer: StateCreator<T>, config: PersistConfig<T>) {
  return create<T>()(
    persist(initializer, {
      ...config,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }),
  );
}
