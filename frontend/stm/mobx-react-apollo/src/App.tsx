import './App.css'
import {RootStoreProvider} from './store/storeContext';
import Counter from './Counter';

const App = () => {
    return (
        <RootStoreProvider>
            <Counter/>
        </RootStoreProvider>
    )
}

export default App
