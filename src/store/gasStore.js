import { create } from 'zustand';

export const useGasStore = create((set) => ({
  chains: {
    ethereum: { baseFee: 0, priorityFee: 2, speeds: {}, history: [] },
    polygon: { baseFee: 0, priorityFee: 2, speeds: {}, history: [] },
    bsc: { baseFee: 0, priorityFee: 2, speeds: {}, history: [] },
  },
  mode: 'live', // could be 'live' or 'manual' toggle later
  speedMode: 'average', // 'slow' | 'average' | 'fast'
  usdPrice: 3100,

  setGas: (chain, { baseFee, priorityFee, speeds, history }) =>
    set((state) => {
      const current = state.chains[chain] || {
        baseFee: 0,
        priorityFee: 2,
        speeds: {},
        history: [],
      };

      return {
        chains: {
          ...state.chains,
          [chain]: {
            ...current,
            baseFee,
            priorityFee,
            speeds,
            history: [...(current.history || []), history].slice(-96),
          },
        },
      };
    }),

  setMode: (mode) => set(() => ({ mode })),

  setSpeedMode: (speed) => set(() => ({ speedMode: speed })),

  setUsdPrice: (price) => set(() => ({ usdPrice: price })),
}));
