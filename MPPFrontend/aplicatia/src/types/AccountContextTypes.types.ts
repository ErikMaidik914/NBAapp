import { ReactNode } from 'react';
import { Account } from '../models/account';

export type AccountContextType = {
    account?: Account;
    setAccount: (account: Account) => void;
};

export type ProviderType = {
    accountContext: AccountContextType;
    children: ReactNode;
};
