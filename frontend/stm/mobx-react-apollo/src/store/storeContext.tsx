import RootStore from './store';
import {createContext, FC, ReactNode, useContext} from 'react';

let store: RootStore

// create the context
export const StoreContext = createContext<RootStore>({} as RootStore);

// create the provider component
export const RootStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    //only create the store once ( store is a singleton)
    const root = store ?? new RootStore()

    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}

