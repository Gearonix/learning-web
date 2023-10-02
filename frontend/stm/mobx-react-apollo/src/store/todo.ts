import {makeAutoObservable} from 'mobx';

class Todo{
    todos: string[] = []
    constructor() {
        makeAutoObservable(this)
    }
    addTodo(todo: string){
        this.todos.push(todo)
    }
    removeTodo(todo: string){
        this.todos = this.todos.filter((t) => t !== todo)
    }
    async fetchTodos(){
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const json = await response.json();
        this.todos.push(json)
    }

    get todosq(){
        return this.todos
    }
}


export default new Todo()
