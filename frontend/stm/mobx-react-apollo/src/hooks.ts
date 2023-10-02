import RootStore from './store/store';
import {useContext} from 'react';
import {StoreContext} from './store/storeContext';



export const useRootStore = <T extends keyof RootStore>(target : T) => {
    const context = useContext(StoreContext)

    return context[target]
}

