import create from 'zustand';

import { LocalStorage } from '../utils';

export interface PrizesStore {
  prizes: string[];
  setPrizes: (prizes: string[]) => void;
}

const PRIZES_KEY = 'prizes';

export const usePrizesStore = create<PrizesStore>(set => ({
  prizes: LocalStorage.get<string[]>(PRIZES_KEY) ?? [],
  setPrizes: prizes => {
    LocalStorage.put(PRIZES_KEY, prizes);

    set(() => ({ prizes }));
  },
}));
