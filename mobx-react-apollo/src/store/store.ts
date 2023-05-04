import TodoState from './slice/todo.state';
import Counter from './counter';

class RootStore {
    todo: TodoState
    counter: Counter

    constructor() {
        this.todo = new TodoState(this)
        this.counter = new Counter(this)
    }
}


export default RootStore
