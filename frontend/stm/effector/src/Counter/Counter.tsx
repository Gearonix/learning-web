import {useStore} from 'effector-react'
import {$todos} from './model.ts'

const Counter = () => {
  const todos = useStore($todos)
  return null
}


export default Counter
