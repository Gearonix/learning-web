import {createEvent, createStore} from 'effector'


interface Todo {
    test: string
}

export const addTodo = createEvent<string>()
export const resetTodo = createEvent()

export const $todos = createStore<Todo>({
    test: '23'
}).on(addTodo, (s, todo) => ({...s, test: todo}))
    .reset(resetTodo)

$todos.watch((todos) => {
    console.log('todos', todos)
})
