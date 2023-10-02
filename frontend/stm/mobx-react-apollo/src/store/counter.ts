import {makeAutoObservable, makeObservable} from 'mobx';
import RootStore from './store';


class Counter {
    count = 0
    root: RootStore
    constructor(root: RootStore) {
        this.root = root
        makeAutoObservable(this)
    }
    increment(){
        this.count = this.count + 1
    }
    decrement(){
        this.count = this.count - 1
    }
}

export default Counter
