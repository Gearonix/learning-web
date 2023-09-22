import {FC, useEffect} from 'react'
import {useRootStore} from './hooks';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx'
import {useMutation, useSubscription} from '@apollo/client';
import {SEND_MESSAGE, SUBSCRIBE_TO_EVENT} from './store/queries';


const Counter : FC = observer(() => {
  const counter = useRootStore('counter')
  const todo = useRootStore('todo');
  const subscription = useSubscription(
      SUBSCRIBE_TO_EVENT,
      {
          onSubscriptionData: (data) => {
              console.log('MESSAGE RECEIVED', data)
          },
          onComplete: () => {
              console.log('Subscription complete.')
          },
          onError: (err) => {
              console.log('Subscription error.', err)
          },
      }
  )
  const [mutation] = useMutation(SEND_MESSAGE)
  useEffect(() => {
      console.log('test')
     todo.services.fetchTodos()
  },[])
  const graphqlTest = async () => {
      await todo.services.graphqlTest(134)
  }
  const createRole = async () => {
      await todo.services.createRole('mutation_test')
  }

  const fileUpload = async (e) => {
      if (e.target.validity.valid){
          await todo.services.uploadFile(e.target.files[0])
      }
  }
  return   <div>
      <button onClick={() => {
          mutation()
      }
      }>test mutation</button>
      <button onClick={graphqlTest}>GRAPHQL TEST</button>
      <button onClick={createRole}>CREATE ROLE</button>
      count: {counter.count}
      <button onClick={() => counter.increment()}>increment</button>
      <button onClick={() => counter.decrement()}>decrement</button>
      {todo.getters.getTodos.map((i, idx) => <h1 key={idx}>{i.toString()}</h1>)}
      <button onClick={() => todo.addTodo('test1')}>add todo</button>
      <button onClick={() => todo.removeTodo('test1')}>add todo</button>
      <input type={'file'} onChange={fileUpload}/>
  </div>
})

export default Counter
