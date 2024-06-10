import { createContext } from 'react';
import { AccountContextType, ProviderType } from '../types/AccountContextTypes.types';

export const AccountContext = createContext<AccountContextType | null>(null);

export function AccountContextProvider({ accountContext, children }: ProviderType) {
    return <AccountContext.Provider value={accountContext}>{children}</AccountContext.Provider>;
}
