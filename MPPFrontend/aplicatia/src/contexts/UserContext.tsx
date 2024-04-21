import { createContext } from 'react';

import { UsersContextProviderType, UsersContextType } from '../types/UsersContextTypes.types';

export const UsersContext = createContext<UsersContextType | null>(null);

function UsersContextProvider({ userContext, children }: UsersContextProviderType) {
    return <UsersContext.Provider value={userContext}>{children}</UsersContext.Provider>;
}

export { UsersContextProvider };
