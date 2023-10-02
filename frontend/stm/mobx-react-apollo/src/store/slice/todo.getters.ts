import {makeAutoObservable} from 'mobx';
import TodoState from './todo.state';

class TodoGetters{
    state: TodoState
    constructor(todoState: TodoState) {
        makeAutoObservable(this)
        this.state = todoState
    }

    get getTodos(){
        return this.state.todos
    }
}


export default TodoGetters
