import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Fan } from '../models/fan';

interface FanStore {
    fans: Fan[];
    addFan: (fan: Fan) => void;
    removeFan: (fanId: number) => void;
    updateFan: (fan: Fan) => void;

    setFans: (fans: Fan[]) => void;
    getFans: () => Fan[];
    getFan: (fanId: number) => Fan | undefined;
}

export const useFanStore = create<FanStore>()(
    persist(
        (set, get) => ({
            fans: [],
            addFan: (fan: Fan) => set((state) => ({ fans: [...state.fans, fan] })),
            removeFan: (fanId: number) => set((state) => ({ fans: state.fans.filter((fan) => fan.getId() !== fanId) })),
            updateFan: (fan: Fan) => set((state) => ({ fans: state.fans.map((u) => (u.getId() === fan.getId() ? fan : u)) })),
            setFans: (fans: Fan[]) => set({ fans }),
            getFans: () => get().fans,
            getFan: (fanId: number) => get().fans.find((fan) => fan.getId() === fanId),
        }),
        {
            name: 'fan-store',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
