import {FC, useEffect} from 'react';
import {useStore} from './store/store';


const Counter: FC = () => {
	const todos: any = useStore();

	const onClick = async () => {
		todos.addTodo('test_test')
	}
	useEffect(() => {
		todos.fetchTodos()
	},[])



    return <div>
		<button onClick={onClick}>add</button>
		{todos.todos.map((i,  idx) => {
			return <h1 key={idx}>{i.title}</h1>
		})}
	</div>
}


export default Counter
