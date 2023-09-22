import {makeAutoObservable} from 'mobx';
import TodoService from './todo.service';
import TodoGetters from './todo.getters';
import RootStore from '../store';

class Todo{
    todos: string[] = []
    private data: any
    services: TodoService
    getters: TodoGetters
    root: RootStore
    constructor(root: RootStore) {
        makeAutoObservable(this)
        this.root = root
        this.services = new TodoService(this)
        this.getters = new TodoGetters(this)
    }
    addTodo(todo: string){
        this.todos.push(todo)
    }
    removeTodo(todo: string){
        this.todos = this.todos.filter((t) => t !== todo)
    }
    changeData(response: any){
        this.data = response
    }


}


export default Todo
