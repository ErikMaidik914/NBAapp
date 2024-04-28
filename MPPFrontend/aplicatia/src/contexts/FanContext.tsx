import { createContext } from 'react';

import { FansContextProviderType, FansContextType } from '../types/FansContextTypes.types';

export const FansContext = createContext<FansContextType | null>(null);

function FansContextProvider({ fanContext, children }: FansContextProviderType) {
    return <FansContext.Provider value={fanContext}>{children}</FansContext.Provider>;
}

export { FansContextProvider };
