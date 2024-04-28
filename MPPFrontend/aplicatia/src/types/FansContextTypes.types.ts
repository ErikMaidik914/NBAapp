import { ReactNode } from 'react';
import { Fan } from '../models/fan';

export type FansContextType = {
    fans: Fan[];
    addFan: (fan: Fan) => void;
    removeFan: (fanId: number) => void;
};

export type FansContextProviderType = {
    fanContext: FansContextType;
    children: ReactNode;
};
