import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../models/user';

interface UserStore {
    users: User[];
    addUser: (user: User) => void;
    removeUser: (userId: number) => void;
    updateUser: (user: User) => void;

    setUsers: (users: User[]) => void;
    getUsers: () => User[];
    getUser: (userId: number) => User | undefined;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            users: [],
            addUser: (user: User) => set((state) => ({ users: [...state.users, user] })),
            removeUser: (userId: number) => set((state) => ({ users: state.users.filter((user) => user.getId() !== userId) })),
            updateUser: (user: User) => set((state) => ({ users: state.users.map((u) => (u.getId() === user.getId() ? user : u)) })),
            setUsers: (users: User[]) => set({ users }),
            getUsers: () => get().users,
            getUser: (userId: number) => get().users.find((user) => user.getId() === userId),
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
