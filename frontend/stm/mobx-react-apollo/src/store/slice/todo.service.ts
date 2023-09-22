import {makeAutoObservable} from 'mobx';
import Todo from './todo.state';
import {apollo} from '../../apollo';
import {CREATE_ROLE, GRAPHQL_TEST, SUBSCRIBE_TO_EVENT, UPLOAD_FILE} from '../queries';

class TodoService {
    state: Todo
    constructor(todoState: Todo) {
        makeAutoObservable(this)
        this.state = todoState
    }
    async fetchTodos(){
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const json = await response.json();
        this.state.todos.push(json)
    }
    async graphqlTest(id: number){
        const response = await apollo.query({
            query: GRAPHQL_TEST,
            variables: {id}
        })
        this.state.changeData(response)
    }
    async createRole(username: string){
        const response = await apollo.mutate({
            mutation: CREATE_ROLE,
            variables: {
                body: {
                    username,
                    id: 6
                }
            }
        })
        console.log('mutation', response)
        // this.state.todos.push(response.data)
    }
    async uploadFile(file: any){
        console.log(file)
        try{
            const response = await apollo.mutate({
                mutation: UPLOAD_FILE,
                variables: {
                    file: file
                },
                context: {
                    headers: {
                        'apollo-require-preflight': true,
                    },
                },
            })
            console.log('mutation', response)
        }
        catch (e){
            console.log(e)
        }
    }

    async subscribeToEvent(){
        await apollo.subscribe({
            query: SUBSCRIBE_TO_EVENT
        })
    }
}


export default TodoService
