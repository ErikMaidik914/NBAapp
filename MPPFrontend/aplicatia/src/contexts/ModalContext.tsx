import { createContext } from 'react';

import { ModalContextProviderType, ModalContextType } from '../types/ModalContextTypes.types';

export const ModalContext = createContext<ModalContextType | null>(null);

function ModalContextProvider({ modalContext, children }: ModalContextProviderType) {
    return <ModalContext.Provider value={modalContext}>{children}</ModalContext.Provider>;
}

export { ModalContextProvider };
